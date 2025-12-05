import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import '@placekit/autocomplete-js/dist/placekit-autocomplete.css';
import { read, updateHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import { Select } from "antd";
import { useParams } from "react-router-dom";
import HotelEditForm from "../componets/forms/HotelEditForm";

const { Option } = Select;

const EditHotel = ({ match }) => {
    const auth = useSelector((state) => state.auth); // no spreading
    const { token } = auth;

    const [values, setValues] = useState({
        title: '',
        content: '',
        location: '',
        price: '',
        from: '',
        to: '',
        bed: '',
    });

    const {
        title,
        content,
        location,
        price,
        from,
        to,
        bed } = values
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState("https://placehold.co/100x100?text=PREVIEW");
    // const [location, setLocation] = useState();

    const { hotelId } = useParams();
    useEffect(() => {
        loadSellerHoter();
    }, [])

    const loadSellerHoter = async () => {
        let res = await read(hotelId);
        // console.log(res);
        setValues({ ...values, ...res.data })
        setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hotelData = new FormData();

        hotelData.append('title', title);
        hotelData.append('content', content);
        hotelData.append('location', location);
        image && hotelData.append('image', image);
        hotelData.append('price', price);
        hotelData.append('from', from);
        hotelData.append('to', to);
        hotelData.append('bed', bed);

        try {
            let res = await updateHotel(token, hotelData, hotelId);
            console.log("Hotel Update response", res)
            toast.success(`${res.data.title} is updated`)
        } catch (err) {
            console.log(err);
            // toast.error(err.response.data.err);
        }
    }


    const handleImageChange = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    // return (
    //     <>
    //         <div className="container-fluid bg-secondary p-5 font-bold text-center">
    //             <h2>Edit Hotel</h2>
    //         </div>
    //         <div className="container-fluid">
    //             <div className="row">
    //                 <div className="col-md-10">
    //                     <br />
    //                     <HotelEditForm
    //                         values={values}
    //                         setValues={setValues}
    //                         handleChange={handleChange}
    //                         handleImageChange={handleImageChange}
    //                         handleSubmit={handleSubmit}
    //                         location={location}
    //                     // setLocation={setLocation}
    //                     />
    //                 </div>
    //                 <div className="col-md-2">
    //                     <img
    //                         src={preview}
    //                         alt="preview_image"
    //                         className="img img-fluid m-2"
    //                     />
    //                     <pre>{JSON.stringify(values, null, 4)}</pre>
    //                 </div>

    //             </div>

    //         </div>
    //     </>
    // )

    return (
        <>
            {/* Header */}
            <div className="container-fluid bg-primary text-white py-5">
                <div className="text-center">
                    <h2 className="fw-bold">Edit Hotel</h2>
                    <p className="mb-0 opacity-75">Update your listing details</p>
                </div>
            </div>

            {/* Main content */}
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    {/* Left: Preview + debug */}
                                    <div className="col-md-4">
                                        <label
                                            htmlFor="image"
                                            className="form-label fw-semibold mb-2"
                                        >
                                            Featured image
                                        </label>
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="img-fluid rounded-3 shadow-sm mb-3"
                                            style={{ height: "200px", width: "100%", objectFit: "cover" }}
                                        />

                                        {/* optional debug box – remove in prod */}
                                        <details className="small text-muted">
                                            <summary className="cursor-pointer">Debug values</summary>
                                            <pre className="mt-2">{JSON.stringify(values, null, 2)}</pre>
                                        </details>
                                    </div>

                                    {/* Right: Form */}
                                    <div className="col-md-8">
                                        <HotelEditForm
                                            values={values}
                                            setValues={setValues}
                                            handleChange={handleChange}
                                            handleImageChange={handleImageChange}
                                            handleSubmit={handleSubmit}
                                            location={location}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditHotel;