const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    //Creating user for the database
    const { name, email, password } = req.body
    //validation
    if (!name) {
        return (
            res.status(400).send('Name is required')
        )
    }
    if (!password || password.length < 6) {
        return (
            res.status(400).send('password is required and should be min 6 characters long')
        )
    }
    let userExits = await User.findOne({ email: email.toLowerCase().trim() }).exec()
    if (userExits) return res.status(400).send('Email is taken')

    const user = new User({
        name,
        email,
        password
    });
    try {
        await user.save()
        console.log("user created", user)
        return res.status(201).json({ message: 'User created successfully.' });
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ error: 'Error creating user. Please try again.' });
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email.toLowerCase().trim() }).exec();
        console.log('user exits', user)

        if (!user) return res.status(400).send("User email not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("Password mismatch");
            return res.status(400).send("Wrong Password");
        }

        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,      // required on Render HTTPS
            sameSite: "none",  // required for cross-domain cookie
            // ❌ No maxAge => session cookie => auto logout on browser close
        });

        res.json({
            token, user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                stripe_account_id: user.stripe_account_id,
                stripe_seller: user.stripe_seller,
                stripeSession: user.stripeSession
            }
        });
    } catch (err) {
        console.log(";login err", err);
        res.status(400).send({ message: 'Login failed. Please try again' })
    }
}


module.exports = { register, login }