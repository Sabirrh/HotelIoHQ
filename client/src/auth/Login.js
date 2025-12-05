
// src/auth/Login.js
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from "react-toastify";
// import { login } from "../actions/auth";
// import LoginForm from "../componets/LoginForm/LoginForm";
// import "react-toastify/dist/ReactToastify.css";


// function Login() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!email || !password) {
//             toast.error("Please fill in all fields");
//             return;
//         }

//         try {
//             const { data } = await login({ email, password });

//             console.log("✅ Login success:", data);
//             toast.success(data.message || "Login successful!");

//             // if (data.user) {
//             //     localStorage.setItem("auth", JSON.stringify(data.user));
//             //     dispatch({
//             //         type: "LOGGED_IN_USER",
//             //         payload:data.user,
//             //     })
//             //     navigate("/dashboard"); // Uncomment if using react-router
//             // }
//             if (data.token && data.user) {
//                 const authData = {
//                     token: data.token,
//                     user: data.user,
//                 };

//                 localStorage.setItem("auth", JSON.stringify(authData));
//                 dispatch({
//                     type: "LOGGED_IN_USER",
//                     payload: authData,
//                 });

//                 navigate("/dashboard");
//             }
//         } catch (err) {
//             console.error("❌ Login error:", err);
//             toast.error(err.response?.data || "Login failed. Please try again.");
//         }
//     };


//     return (
//         <>
//             <ToastContainer />
//             <div className="container-fluid bg-primary text-white text-center p-5 mb-5">
//                 <h1 className="display-5">Login to MarketPlace</h1>
//                 <p className="lead">Access exclusive features and start shopping or selling!</p>
//             </div>

//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-md-6">
//                         <LoginForm
//                             handleSubmit={handleSubmit}
//                             email={email}
//                             setEmail={setEmail}
//                             password={password}
//                             setPassword={setPassword}
//                         />
//                         <p className="text-center mt-3">
//                             Don't have an account? <a href="/register">Register here</a>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Login;

// src/auth/Login.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../componets/LoginForm/LoginForm";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const { data } = await login({ email, password });
            toast.success(data.message || "Login successful!");

            if (data.token && data.user) {
                const authData = { token: data.token, user: data.user };
                localStorage.setItem("auth", JSON.stringify(authData));
                dispatch({ type: "LOGGED_IN_USER", payload: authData });
                navigate("/dashboard");
            }
        } catch (err) {
            toast.error(err.response?.data || "Login failed. Please try again.");
        }
    };

    return (
        <>
            <ToastContainer />

            {/* Header */}
            <div className="container-fluid bg-primary text-white text-center py-5 mb-5">
                <h1 className="display-5 fw-bold">Login to HotelIoHQ</h1>
                <p className="lead">Access exclusive features and start Hotels or Bookings!</p>
            </div>

            {/* Centered Login Card */}
            <div className="container d-flex justify-content-center align-items-center">
                <div className="card shadow-sm rounded-4 p-4" style={{ maxWidth: "400px", width: "100%" }}>
                    <h2 className="text-center mb-4 text-primary fw-bold">Welcome Back</h2>

                    {/* Login Form */}
                    <LoginForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />

                    <p className="text-center mt-3 text-muted">
                        Don't have an account? <a href="/register" className="text-decoration-none">Register here</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
