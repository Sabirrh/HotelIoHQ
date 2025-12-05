import { Link } from "react-router";
import ConnectNav from "../componets/NavBar/ConnectNav";
import DashboardNav from "../componets/NavBar/Dashboardnav";
import { useDispatch, useSelector } from "react-redux";
import { HomeOutlined } from '@ant-design/icons';
import { createConnectAccount, getAccountStatus } from '../actions/stripe';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { deleteHotel, sellerHotels } from "../actions/hotel";
import SmallCard from "../componets/Card/SmallCard";
import { updateUserInLocalStorage } from "../actions/auth";

const DashboardSeller = () => {

    const auth = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [loadingStripe, setLoadingStripe] = useState(true)
    console.log("Object Token: ", auth);
    const dispatch = useDispatch();

    //Refresh Stripe Status
    const refreshStripeStatus = async () => {
        try {
            const res = await getAccountStatus(auth.token);

            // Update localStorage + Redux
            updateUserInLocalStorage(
                { ...auth, user: res.data },
                () => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: { ...auth, user: res.data }
                    });
                }
            );
        } catch (err) {
            console.log("Stripe status refresh failed", err);
        } finally {
            setLoadingStripe(false)
        }
    };



    useEffect(() => {
        if (auth && auth.token) {
            refreshStripeStatus();
            loadSellersHotels();
        }
        // loadSellersHotels();
    }, []);

    const loadSellersHotels = async () => {
        let { data } = await sellerHotels(auth.token);
        console.log("Hotels data:", data);
        setHotels(data);
    }



    const stripeHandler = async () => {
        setLoading(true);
        try {
            let res = await createConnectAccount(auth.token);
            console.log(res)
            window.location.href = res.data;
        } catch (err) {
            console.log(err);
            toast.error("Stripe connection failed. Try again.")
            setLoading(false)
        }
    }

    const handleHotelDelete = async (hotelId) => {
        if (!window.confirm('Are you sure')) return;
        deleteHotel(auth.token, hotelId).then(res => {
            toast.success("Hotel Deleted");
            loadSellersHotels();
        })
    }


    if (loadingStripe) {
        return (
            <>
                <div className="container-fluid bg-secondary p-5">
                    <ConnectNav />
                </div>
                <div className="container text-center p-5">
                    <h4>Loading your Stripe account…</h4>
                </div>
            </>
        );
    }



    const Connected = () => {
        return (

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Hotels</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to='/hotels/new' className="btn btn-primary">
                            + Add New
                        </Link>
                    </div>
                    <div className="row">
                        {hotels.map(h => <SmallCard
                            key={h._id} h={h}
                            showViewMoreButton={false}
                            owner={true}
                            handleHotelDelete={handleHotelDelete}
                        />)}
                    </div>
                </div>
            </div>
        )
    }



    
    const notConnected = () => {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        {/* <h2>Connect with Stripe</h2> */}
                        <HomeOutlined className="h1" />
                        <h4>Setup payout to post hotel rooms</h4>
                        <p className="lead">MERN partner with stripe to transfer earning to Your bank account</p>
                        <button
                            disabled={loading}
                            onClick={stripeHandler}
                            className="btn btn-primary mb-3">
                            {loading ? "Processing..." : "Setup Payout"}
                        </button>
                        <p className="text-muted">
                            <small>
                                You'll be redirected to stripe to complete the onboarding process.
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>

            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-5">
                <DashboardNav />
            </div>

            {auth &&
                auth.user &&
                auth.user.stripe_seller &&
                auth.user.stripe_seller.charges_enabled
                ? Connected()
                :
                notConnected()
            }
            <ToastContainer position="top-center" />
        </>
    )
}

export default DashboardSeller;



