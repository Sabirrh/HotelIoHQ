// import { currencyFormatter } from "../../actions/stripe";
// import { difDays } from "../../actions/hotel";
// import { Link, useNavigate } from "react-router";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { useState } from "react";
// import OrderModal from "../Modals/Modal";

// const BookingCard = ({ h,
//     hotel, session, orderBy

// }) => {
//     const diff = difDays(hotel.from, hotel.to);
//     const navigate = useNavigate();
//     const [showModal, setShowModal] = useState(false);

//     const handleNextPage = () => {
//         navigate(`hotel/${hotel._id}`)
//     }
//     // return (
//     //     <>
//     //         <div className="card mb-3">
//     //             <div className="row no-gutters">
//     //                 <div className="col-md-4">
//     //                     {hotel.image && hotel.image.contentType ? (
//     //                         <img
//     //                             src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
//     //                             alt="default hotel"
//     //                             className="card-image img img-fluid"
//     //                         />
//     //                     ) : (
//     //                         <img
//     //                             src="https://placehold.co/900x500?text=MERN+Booking"
//     //                             alt="default hotel"
//     //                             className="card-image img img-fluid"
//     //                         />
//     //                     )}
//     //                 </div>
//     //                 <div className="col-md-8">
//     //                     <div className="card-body">
//     //                         <h3 className="card-title">{hotel.title}{' '}
//     //                             <span className="float-right text-primary cursor-pointer">
//     //                                 {currencyFormatter({
//     //                                     amount: hotel.price,
//     //                                     currency: "usd"
//     //                                 })}
//     //                             </span>{' '}
//     //                         </h3>

//     //                         <p className="alert alert-info">{hotel.location}</p>
//     //                         <p className="class-text">{`${hotel.content.substring(1, 200)}...`}</p>
//     //                         <p className="card-text">
//     //                             <span className="float-right text-primary">
//     //                                 for {diff} {diff <= 1 ? "day" : "days"}
//     //                             </span>
//     //                         </p>
//     //                         <p className="card-text">{hotel.bed} bed</p>
//     //                         <p className="card-text">Available from {new Date(hotel.from).toLocaleDateString()}</p> 

//     //                          {showModal && (
//     //                             <OrderModal session={session} orderBy={orderBy} showModal={showModal} setShowModal={setShowModal}/>
//     //                          )}


//     //                         <div className="d-flex justify-content-between h4">
//     //                                 <button onClick={() => setShowModal(!showModal)} className="btn btn-primary">
//     //                                     Show Paymeny info
//     //                                 </button>

//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     </>
//     // )

//     return (
//         <>
//             <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
//                 <div className="row g-0">
//                     {/* IMAGE */}
//                     <div className="col-md-4">
//                         <img
//                             src={
//                                 hotel.image && hotel.image.contentType
//                                     ? `${process.env.REACT_APP_API}/hotel/image/${hotel._id}`
//                                     : "https://placehold.co/600x400?text=Hotel"
//                             }
//                             alt={hotel.title}
//                             className="img-fluid w-100 h-100"
//                             style={{ objectFit: "cover", maxHeight: "220px" }}
//                         />
//                     </div>

//                     {/* CONTENT */}
//                     <div className="col-md-8 d-flex flex-column p-3 p-md-4">
//                         {/* TITLE + PRICE TAG */}
//                         <div className="d-flex justify-content-between align-items-start mb-2">
//                             <h5 className="fw-bold mb-0">{hotel.title}</h5>
//                             <span className="badge bg-dark fs-6 px-3 py-2 rounded-pill">
//                                 {currencyFormatter({ amount: hotel.price, currency: "usd" })}
//                             </span>
//                         </div>

//                         {/* LOCATION */}
//                         <p className="mb-2 text-muted">
//                             <i className="bi bi-geo-alt-fill text-primary" /> {hotel.location}
//                         </p>

//                         {/* DESCRIPTION */}
//                         <p className="text-secondary mb-3 flex-grow-1">
//                             {hotel.content.substring(0, 130)}…
//                         </p>

//                         {/* META LINE */}
//                         <div className="row row-cols-auto small text-muted mb-3 g-2">
//                             <div className="col">
//                                 <i className="bi bi-calendar3" />{" "}

//                              {new Date(hotel.from).toLocaleDateString()}
//                             </div>
//                             <div className="col">
//                                 <i className="bi bi-moon-stars" /> {diff}
//                                 {diff <= 1 ? "night" : "nights"}
//                             </div>
//                             <div className="col">
//                                 <i className="bi bi-person" /> {hotel.bed} bed
//                             </div>
//                         </div>

//                         {/* PAY BUTTON */}
//                         <div className="mt-auto text-end">
//                             <button
//                                 onClick={() => setShowModal((s) => !s)}
//                                 className="btn btn-primary btn-sm px-4 rounded-pill"
//                             >
//                                 <i className="bi bi-credit-card me-1" /> Payment info
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {showModal && (
//                 <OrderModal
//                     session={session}
//                     orderBy={orderBy}
//                     showModal={showModal}
//                     setShowModal={setShowModal}
//                 />
//             )}
//         </>
//     );
// };


// export default BookingCard;


import { currencyFormatter } from "../../actions/stripe";
import { difDays } from "../../actions/hotel";
import { useNavigate } from "react-router";
import { useState } from "react";
import OrderModal from "../Modals/Modal";

const BookingCard = ({ hotel, session, orderBy }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // Safety check: hotel must exist
    if (!hotel) return null;

    // Safe fallback values
    const safeFrom = hotel?.from ? new Date(hotel.from) : null;
    const safeTo = hotel?.to ? new Date(hotel.to) : null;

    // Safe difference calculation
    const diff =
        safeFrom && safeTo
            ? difDays(hotel.from, hotel.to)
            : 0;

    const formattedFrom = safeFrom
        ? safeFrom.toLocaleDateString()
        : "N/A";

    const contentPreview = hotel?.content
        ? hotel.content.substring(0, 130)
        : "";

    const imageSrc =
        hotel?.image?.contentType
            ? `${process.env.REACT_APP_API}/hotel/image/${hotel._id}`
            : "https://placehold.co/600x400?text=Hotel";

    return (
        <>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                <div className="row g-0">

                    {/* IMAGE */}
                    <div className="col-md-4">
                        <img
                            src={imageSrc}
                            alt={hotel?.title || "Hotel"}
                            className="img-fluid w-100 h-100"
                            style={{ objectFit: "cover", maxHeight: "220px" }}
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="col-md-8 d-flex flex-column p-3 p-md-4">

                        {/* TITLE + PRICE */}
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="fw-bold mb-0">{hotel?.title || "Untitled Hotel"}</h5>
                            <span className="badge bg-dark fs-6 px-3 py-2 rounded-pill">
                                {currencyFormatter({
                                    amount: hotel?.price || 0,
                                    currency: "usd",
                                })}
                            </span>
                        </div>

                        {/* LOCATION */}
                        <p className="mb-2 text-muted">
                            <i className="bi bi-geo-alt-fill text-primary" />{" "}
                            {hotel?.location || "Unknown location"}
                        </p>

                        {/* DESCRIPTION */}
                        <p className="text-secondary mb-3 flex-grow-1">
                            {contentPreview}…
                        </p>

                        {/* META INFO */}
                        <div className="row row-cols-auto small text-muted mb-3 g-2">
                            <div className="col">
                                <i className="bi bi-calendar3" /> {formattedFrom}
                            </div>
                            <div className="col">
                                <i className="bi bi-moon-stars" /> {diff}{" "}
                                {diff === 1 ? "night" : "nights"}
                            </div>
                            <div className="col">
                                <i className="bi bi-person" /> {hotel?.bed || "?"} bed
                            </div>
                        </div>

                        {/* PAYMENT BUTTON */}
                        <div className="mt-auto text-end">
                            <button
                                onClick={() => setShowModal((s) => !s)}
                                className="btn btn-primary btn-sm px-4 rounded-pill"
                            >
                                <i className="bi bi-credit-card me-1" /> Payment info
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <OrderModal
                    session={session}
                    orderBy={orderBy}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
        </>
    );
};

export default BookingCard;
