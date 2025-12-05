import { LoadingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAccountStatus } from "../actions/stripe";
import { updateUserInLocalStorage } from "../actions/auth";

const StripeCallback = () => {
    const dispatch = useDispatch();
    // const { auth } = useSelector((state) => ({ ...state }));
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const accountStatus = async () => {
        try {
            const res = await getAccountStatus(auth.token);
             console.log("user Account status on stripe callbak",res )
            //update user in localStorage
            updateUserInLocalStorage({...auth,user:res.data}, () => {
                // update user in redux
                dispatch({
                    type: "LOGGED_IN_USER",
                    // payload: res.data,
                    payload: {...auth,user:res.data}
                });
                 navigate('/dashboard/seller');
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (auth && auth.token) {
            accountStatus();
        }
    }, [auth])


    return (
        <div className="d-flex justify-content-center p-5">This page is for call back.
            <LoadingOutlined className="display-1 p-5 text-danger" />
        </div>
    )
}

export default StripeCallback;