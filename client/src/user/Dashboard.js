import { Link } from "react-router-dom";
import ConnectNav from "../componets/NavBar/ConnectNav";
import DashboardNav from "../componets/NavBar/Dashboardnav";
import { userHotelBookings } from "../actions/hotel";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import BookingCard from "../componets/Card/BookingCard";

const Dashboard = () => {

    const [booking, setBooking] = useState([])
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        if (auth && auth.token) {
            loadUserBookings()
        }
    },[])

    const loadUserBookings = async () => {
        try {
            const res = await userHotelBookings(auth.token);
            console.log(res);
            setBooking(res.data)
        } catch (error) {
            console.log("Something is wrong here", error)
        }
    }
    return (
        <>

            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>
            <div className="container-fluid p-5">
                <DashboardNav />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Booking</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to='/home' className="btn btn-primary">Browse Hotels</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                {booking.map(b => (
                    <BookingCard 
                    key={b._id} 
                    hotel={b.hotel} 
                    session={b.session} 
                    orderBy={b.orderBy} />
              ))}
            </div>
        </>
    )
}

export default Dashboard;