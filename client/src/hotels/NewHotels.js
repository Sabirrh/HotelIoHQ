import { useState } from "react";
import { toast } from "react-toastify";
import '@placekit/autocomplete-js/dist/placekit-autocomplete.css';
import { createHotel } from "../actions/hotel";
import { useSelector } from "react-redux";
import CreateHotelForm from "../componets/forms/CreateHotelForm";


const NewHotels = () => {

    // redux
    const auth = useSelector((state) => state.auth);
    const { token } = auth;


    const [values, setValues] = useState({
        title: '',
        content: '',
        image: '',
        price: '',
        from: '',
        to: '',
        bed: '',
    });

    const {
        title,
        content,
        image,
        price,
        from,
        to,
        bed } = values

    const [preview, setPreview] = useState("https://placehold.co/100x100?text=PREVIEW");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let hotelData = new FormData();

        hotelData.append('title', title);
        hotelData.append('content', content);
        hotelData.append("location", location);
        hotelData.append('image', image);
        hotelData.append('price', price);
        hotelData.append('from', from);
        hotelData.append('to', to);
        hotelData.append('bed', bed);

        console.log(...hotelData)
        // Debug FormData
        for (let p of hotelData.entries()) {
            console.log(p[0] + ": ", p[1]);
        }
        try {
            const res = await createHotel(token, hotelData);
            console.log(res);
            toast.success('New Hotel Posted')
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
        catch (err) {
            console.log(err)
            toast.error("Please Try again.")
        }
    }

    const handleImageChange = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setValues({ ...values, image: e.target.files[0] });
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    // return (
    //     <>
    //         <div className="container-fluid bg-secondary p-5 font-bold text-center">
    //             <h2>Add Hotel</h2>
    //         </div>
    //         <div className="container-fluid">
    //             <div className="row">
    //                 <div className="col-md-10">
    //                     <br />
    //                     <CreateHotelForm
    //                         values={values}
    //                         setValues={setValues}
    //                         handleChange={handleChange}
    //                         handleImageChange={handleImageChange}
    //                         handleSubmit={handleSubmit}
    //                         location={location}
    //                         setLocation={setLocation}
    //                     />
    //                 </div>
    //                 <div className="col-md-2">
    //                     <img
    //                         className="img img-fluid m-2"
    //                         src={preview}
    //                         alt="preview_image" />
    //                     {/* <pre>{JSON.stringify(values, null, 4)}</pre>
    //                     {JSON.stringify(location)} */}
    //                 </div>
    //             </div>
    //         </div>
    //     </>
    // )
    return (
        <>
            {/* Header */}
            <div className="container-fluid bg-primary text-white py-5 mb-4">
                <div className="text-center">
                    <h2 className="fw-bold">Add New Hotel</h2>
                    <p className="mb-0 opacity-75">Fill in the details below to list your hotel</p>
                </div>
            </div>

            {/* Form section */}
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="card shadow-sm rounded-4">
                            <div className="card-body p-4">
                                <div className="row g-4">
                                    {/* Left: Preview */}
                                    <div className="col-md-4 text-center">
                                        <label
                                            htmlFor="image"
                                            className="d-block cursor-pointer mb-2 fw-semibold"
                                        >
                                            Featured image
                                        </label>
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="img-fluid rounded-3 shadow-sm"
                                            style={{ maxHeight: "220px", objectFit: "cover", width: "100%" }}
                                        />
                                    </div>

                                    {/* Right: Fields */}
                                    <div className="col-md-8">
                                        <CreateHotelForm
                                            values={values}
                                            setValues={setValues}
                                            handleChange={handleChange}
                                            handleImageChange={handleImageChange}
                                            handleSubmit={handleSubmit}
                                            location={location}
                                            setLocation={setLocation}
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

};

export default NewHotels;