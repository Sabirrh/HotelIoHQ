import React, { useEffect, useState } from "react";
import { read, difDays, isAlreadyBooked } from "../actions/hotel";
import { Link, useNavigate, useParams } from "react-router";
import moment from 'moment';
import { useSelector } from "react-redux";
import { getSessionId } from "../actions/stripe";
import { loadStripe } from '@stripe/stripe-js';

const ViewHotel = () => {
    const [hotel, setHotel] = useState({});
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false)
    const { hotelId } = useParams();
    const diff = difDays(hotel.from, hotel.to);
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);


    useEffect(() => {
        loadSellerHoter();
    }, [])

    useEffect(() => {
        if (auth && auth.token) {
            isAlreadyBooked(auth.token, hotelId).then((res) => {
                // console.log(res);
                if (res.data.ok) {
                    setAlreadyBooked(true);
                }
            })
        }
    }, [])

    const loadSellerHoter = async () => {
        let res = await read(hotelId);
        // console.log(res);
        setHotel(res.data)
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
    }
    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!auth || !auth.token) {
            navigate('/login');
            return;
        }

        try {
            // 1. Get the session URL from backend
            const res = await getSessionId(auth.token, hotelId);
            const checkoutUrl = res.data.url;

            if (!checkoutUrl) {
                console.error("No checkout URL returned");
                return;
            }

            // 2. Redirect to Stripe Checkout
            window.location.href = checkoutUrl;

        } catch (err) {
            console.error("Error creating Stripe session: ", err);
        }
    };



    // return (
    //     <>
    //         <div className="container-fluid bg-secondary p-5 font-bold text-center">
    //             <h2>{hotel.title}</h2>
    //         </div>
    //         <div className="container-fluid">
    //             <div className="row">
    //                 <div className="col-md-6">
    //                     <br />
    //                     <img src={image} alt={hotel.title} className="img img-fluid m-2" />
    //                 </div>
    //                 <div className="col-md-6">
    //                     <br />
    //                     <b>{hotel.content}</b>
    //                     <p className="alert alert-info mt-3">${hotel.price}</p>
    //                     <p className="card-text">
    //                         <span className="float-right text-primary">
    //                             for {diff} {diff <= 1 ? "day" : "days"}
    //                         </span>
    //                     </p>
    //                     <p>
    //                         From <br /> {moment(new Date(hotel.from)).format("MMMM Do YYYY, h:mm:ss a")}
    //                     </p>
    //                     <p>
    //                         To <br /> {moment(new Date(hotel.to)).format("MMMM Do YYYY, h:mm:ss a")}
    //                     </p>

    //                     <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i>
    //                     <br />
    //                     <button
    //                         className="btn btn-block btn-lg btn-primary mt-3"
    //                         onClick={handleClick}
    //                         disabled={loading || alreadyBooked}
    //                     >
    //                         {loading ? "Checking out.." : alreadyBooked ?"Already Booked" : auth && auth.token ? "Book Now" : "Login to Book"}
    //                     </button>
    //                 </div>
    //                 <div>

    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )

    return (
        <>
            {/* Hero */}
            <div className="bg-dark text-white py-5 mb-4">
                <div className="container text-center">
                    <h1 className="display-5 fw-bold">{hotel.title}</h1>
                    <p className="lead mb-0">
                        <i className="bi bi-geo-alt-fill me-1" />
                        {hotel.location || "Prime location"}
                    </p>
                </div>
            </div>

            <div className="container mb-5">
                <div className="row g-4">
                    {/* LEFT – Image */}
                    <div className="col-lg-6">
                        <div className="sticky-lg-top" style={{ top: "2rem" }}>
                            <img
                                src={image}
                                alt={hotel.title}
                                className="img-fluid rounded-4 shadow-lg"
                            />
                        </div>
                    </div>

                    {/* RIGHT – Info + CTA */}
                    <div className="col-lg-6">
                        <div className="card border-0 h-100">
                            <div className="card-body p-4">
                                {/* Price badge */}
                                <div className="d-flex align-items-center mb-3">
                                    <span className="badge bg-primary fs-5 px-3 py-2">
                                        ${hotel.price}
                                    </span>
                                    <span className="text-muted ms-auto">
                                        {diff} {diff <= 1 ? "night" : "nights"}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="fs-5 mb-5">{hotel.content}</p>

                                {/* Date block */}
                                <ul className="list-group list-group-flush mb-4">
                                    <li className="list-group-item d-flex justify-content-between px-0">
                                        <span className="fw-semibold">Check-in</span>
                                        <span>{moment(hotel.from).format("ddd, D MMM YYYY")}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between px-0">
                                        <span className="fw-semibold">Check-out</span>
                                        <span>{moment(hotel.to).format("ddd, D MMM YYYY")}</span>
                                    </li>
                                </ul>

                                {/* Host */}
                                <div className="d-flex align-items-center mb-4">
                                    <div className="avatar avatar-sm bg-secondary rounded-circle me-2">
                                        <i className="bi bi-person-fill text-white" />
                                    </div>
                                    <small className="text-muted">
                                        Listed by <span className="fw-semibold">{hotel.postedBy?.name}</span>
                                    </small>
                                </div>

                                {/* CTA */}
                                <button
                                    className={`btn btn-lg w-100 ${alreadyBooked ? "btn-outline-secondary" : "btn-primary"} fw-semibold`}
                                    onClick={handleClick}
                                    disabled={loading || alreadyBooked}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                                            Processing…
                                        </>
                                    ) : alreadyBooked ? (
                                        <>
                                            <i className="bi bi-check-circle me-2" />
                                            Already Booked
                                        </>
                                    ) : auth && auth.token ? (
                                        "Book with Stripe"
                                    ) : (
                                        "Login to Book"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewHotel;