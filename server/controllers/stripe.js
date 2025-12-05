const User = require('../models/user');
const Stripe = require('stripe');
const queryString = require('query-string');
const Hotel = require('../models/hotel');
const Order = require('../models/order')


const stripe = Stripe(process.env.STRIPE_SECRET);
// controllers/stripe.js
const createConnectAccount = async (req, res) => {
    //1. find user from db
    const user = await User.findById(req.user._id).exec();
    console.log("USER>", user);

    //2. if user is not register to the stripe OR don't have stripe account , create Now
    if (!user.stripe_account_id) {
        const account = await stripe.accounts.create({
            type: 'express',
            email: user.email,
        })
        console.log('Account details', account);
        user.stripe_account_id = account.id;
        await user.save();
    }

    //3. create login link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: 'account_onboarding'
    })

    //prefill user info e.g email
    accountLink = Object.assign(accountLink, {
        'stripe_user[email]': user.email || undefined,
    })
    console.log("account Link", accountLink)
    //4. update payent schedule (optional. default os 2 days)
    let link = `${accountLink.url}?${queryString.default.stringify(accountLink)}`
    console.log("login Link", link)
    res.send(link);
}


const updateDelayDays = async (accountId) => {
    console.log("Upadate Acount", accountId);
    const account = await stripe.accounts.update(accountId, {
        settings: {
            payouts: {
                schedule: {
                    delay_days: 7,
                }
            }
        }
    })
    return account;
}

const getAccountStatus = async (req, res) => {

    try {
        const user = await User.findById(req.user._id).exec();
        console.log("Account retrieve", user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const stripeAccountId = await stripe.accounts.retrieve(user.stripe_account_id);
        // console.log("Stripe account info retrieve" , stripeAccountId);
        //Update delays days
        const updatedAccount = await updateDelayDays(stripeAccountId.id);
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                stripe_seller: updatedAccount,
            },
            {
                new: true
            },
        ).select('-password').exec();
        // console.log('updated User', updatedUser)
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

const getAccountBalance = async (req, res) => {
    const user = await User.findById(req.user._id).exec();

    try {
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id,
        });
        // console.log("Balance ===>", balance);
        res.json(balance)
    } catch (err) {
        console.log(err)
    }
}

const payoutSetting = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).exec();
        const loginLink = await stripe.accounts.createLoginLink(user.stripe_seller.id, {
            redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
        })
        console.log("Payout login link", loginLink)
        res.json(loginLink)
    } catch (err) {
        console.log("Stripe payout login", err)
    }
}

const stripeSessionId = async (req, res) => {
    console.log("You hot stripe session id", req.body.hotelId);
    //1 get hotelId from frontend
    const { hotelId } = req.body;
    //2 find the hotel based on the hotel id from db
    const item = await Hotel.findById(hotelId).populate('postedBy').exec();
    // console.log("find Hotel by id: ", item)

    //3 20% charge for application fee
    const fee = (item.price * 20) / 100;
    //4 create a session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        //5 puchasing item details, it will be shown to user on checkout
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.title,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: 1,
            }
        ],
        //create a payment intent is for platfom charge foe HotelIoHQ
        // payment_intent_data: {
        //     application_fee_amount: fee,
        //     //this seller can see hir balance on frontend dashboard
        //     transfer_data: {
        //         destination: item.postedBy.stripe_account_id,
        //     }
        // },
        //Success and Cancel url
        mode: 'payment', // required
        customer_email: req.user.email,
        success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}/hotel/${item._id}`,
    })
    // console.log("SESSION ====> ", JSON.stringify(session));
    //add this session object to user in db
    // await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();
    // res.send({
    //     sessionId: session.id,
    // })
    await User.findByIdAndUpdate(req.user._id, {
        stripeSession: { id: session.id },
    }).exec();
    res.json({ url: session.url })
}

 const stripeSuccess =async(req,res) => {
      try{
        //get hotel id from req.body
      const {hotelId} = req.body;
       // find currently logged in user
      const user = await User.findById(req.user._id).exec();
      // retrieve stripe session, basses on session id we previously save in user db
      const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id,{ expand: ["payment_intent"] });

      console.log("SESSION PAYMENT STATUS:", session.payment_status);
      // if session payment status is paid, create order
      if(session.payment_status === 'paid'){
        // check if order with that session id already exist by quering orders collection
        const orderExist = await Order.findOne({"session.id":session.id}).exec();
        if(orderExist){
            res.json({success:true})
        }else{
            //else
                let newOrder = await new Order({
                    hotel:hotelId,
                    session,
                    orderBy:user._id,
                }).save();
                // remove user's s stripeSession
                await User.findByIdAndUpdate(user._id, {
                    $set: {stripeSession: {}},
                });
                res.json({success: true});
        }
      }
      }catch(error){
        console.log("Error is there in Payment: ",error)
        res.status(400).send({message:"Error in payment."})
      }

 }



module.exports = { createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting, stripeSessionId, stripeSuccess };


