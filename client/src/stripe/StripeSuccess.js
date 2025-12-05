import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";
import { useNavigate, useParams } from "react-router";
import { LoadingOutlined } from "@ant-design/icons";

const StripeSuccess = () => {
    // const [] = useState();
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const { hotelId } = useParams();
    useEffect(() => {
        console.log("send this local id to backend", hotelId)
        stripeSuccessRequest(token, hotelId).then(res => {
            if (res.data.success) {
                // console.log('Stripe sucess response', res.data.success)
                navigate("/dashboard")
            } else {
                navigate("/stripeCancel")
            }
        })
    }, [hotelId])

    return (
        <div className="container">
            <div className="d-flex justify-content-center p-5">
               <LoadingOutlined className="display-1 text-sucess" />
            </div>
        </div>
    )
}

export default StripeSuccess;