// import RegisterForm from "../componets/RegisterForm/RegisterForm";
// import { useState } from "react";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from "react-router";
// import { register } from '../actions/auth'

// function Register() {
//     const navigate = useNavigate()
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!name || !email || !password) {
//             toast.error("All fields are required");
//             return;
//         }
//         try {
//             const response = await register({
//                 name,
//                 email,
//                 password
//             })
//             toast.success('Register Sucess. Please login')
//             //clear the form 
//             setName('');
//             setEmail('');
//             setPassword('');
//             setTimeout(() => {
//                 navigate('/login'); // ✅ redirect after toast
//             }, 1500);
//         } catch (error) {
//             console.log(error);
//             if (error.response.status === 400) {
//                 toast.error(error.response.data)
//             } else {
//                 toast.error("Something went wrong");
//             }

//         }
//     }
//     return (

//         <>

//             <div className="min-vh-100 d-flex align-items-center">
//                 <div className="container">
//                     <div className="row shadow-lg rounded overflow-hidden">

//                         {/* Left side - Hero image or marketing */}
//                         <div
//                             className="col-md-6 d-none d-md-block"
//                             style={{
//                                 backgroundImage: 'url("https://source.unsplash.com/800x800/?marketplace,shopping")',
//                                 backgroundSize: 'cover',
//                                 backgroundPosition: 'center',
//                                 minHeight: '600px',
//                             }}
//                         >
//                             {/* Optional overlay */}
//                             <div className="h-100 w-100 bg-dark bg-opacity-50 d-flex flex-column justify-content-center text-white p-5">
//                                 <h2>Welcome to HotelIoHQ</h2>
//                                 <p className="lead">
//                                     Join thousands of sellers and buyers — discover amazing hotels and deals!
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Right side - Form */}
//                         <div className="col-md-6 bg-white p-5">
//                             <h2 className="mb-4 text-center">Create Your Account</h2>
//                             <RegisterForm
//                                 handleSubmit={handleSubmit}
//                                 name={name}
//                                 setName={setName}
//                                 email={email}
//                                 setEmail={setEmail}
//                                 password={password}
//                                 setPassword={setPassword}
//                             />
//                             <p className="text-center mt-4 text-muted">
//                                 Already have an account? <a href="/login">Login here</a>
//                             </p>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Register;

// src/auth/Register.js
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { register } from "../actions/auth";
import RegisterForm from "../componets/RegisterForm/RegisterForm";
import { Card } from 'antd';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("All fields are required");
            return;
        }
        try {
            await register({ name, email, password });
            toast.success('Registration successful! Please login');
            setName('');
            setEmail('');
            setPassword('');
            setTimeout(() => navigate('/login'), 1500);
        } catch (error) {
            console.error(error);
            if (error.response?.status === 400) {
                toast.error(error.response.data);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <>
            <ToastContainer />

            {/* Header Section */}
            <div className="container-fluid bg-primary text-white text-center py-5 mb-4">
                <h1 className="display-6 fw-bold">Register at HotelIoHQ</h1>
                <p className="lead mb-0">Create your account and start Bokking and enjoying!</p>
            </div>

            {/* Centered Registration Card */}
            <div className="container d-flex justify-content-center align-items-center py-4">
                <div className="card shadow-sm rounded-4 w-100" style={{ maxWidth: "400px" }}>
                    <div className="card-body p-4 p-sm-5">
                        <h2 className="text-center mb-4 text-primary fw-bold">Create Your Account</h2>

                        {/* Register Form */}
                        <RegisterForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                        />

                        <p className="text-center mt-3 text-muted">
                            Already have an account?{" "}
                            <a href="/login" className="text-decoration-none">
                                Login here
                            </a>
                        </p>


                    </div>
                </div>
            </div>
        </>
    );


}

export default Register;



