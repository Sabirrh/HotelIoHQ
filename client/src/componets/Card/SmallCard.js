// import { currencyFormatter } from "../../actions/stripe";
// import { difDays } from "../../actions/hotel";
// import { Link, useNavigate } from "react-router";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// const SmallCard = ({ h,
//     handleHotelDelete = (f) => f,
//     owner = false,
//     showViewMoreButton = true
// }) => {
//     const diff = difDays(h.from, h.to);
//     const navigate = useNavigate();

//     const handleNextPage = () => {
//         navigate(`hotel/${h._id}`)
//     }
//     return (
//         <>
//             <div className="card mb-3">
//                 <div className="row no-gutters">
//                     <div className="col-md-4">
//                         {h.image && h.image.contentType ? (
//                             <img
//                                 src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
//                                 alt="default hotel"
//                                 className="card-image img img-fluid"
//                             />
//                         ) : (
//                             <img
//                                 src="https://placehold.co/900x500?text=MERN+Booking"
//                                 alt="default hotel"
//                                 className="card-image img img-fluid"
//                             />
//                         )}
//                     </div>
//                     <div className="col-md-8">
//                         <div className="card-body">
//                             <h3 className="card-title">{h.title}{' '}
//                                 <span className="float-right text-primary cursor-pointer">
//                                     {currencyFormatter({
//                                         amount: h.price,
//                                         currency: "usd"
//                                     })}
//                                 </span>{' '}
//                             </h3>

//                             <p className="alert alert-info">{h.location}</p>
//                             <p className="class-text">{`${h.content.substring(1, 200)}...`}</p>
//                             <p className="card-text">
//                                 <span className="float-right text-primary">
//                                     for {diff} {diff <= 1 ? "day" : "days"}
//                                 </span>
//                             </p>
//                             <p className="card-text">{h.bed} bed</p>
//                             <p className="card-text">Available from {new Date(h.from).toLocaleDateString()}</p>

//                             <div className="d-flex justify-content-between h4">
//                                 {showViewMoreButton && (
//                                     <button onClick={handleNextPage} className="btn btn-primary">
//                                         Show more
//                                     </button>
//                                 )}

//                                 {owner && (
//                                     <>
//                                         <Link to={`/hotel/edit/${h._id}`}>
//                                             <EditOutlined className="text-warning" />
//                                         </Link>
//                                         <DeleteOutlined onClick={() => handleHotelDelete(h._id)} className="text-danger" />
//                                     </>
//                                 )}

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default SmallCard;

import { currencyFormatter } from "../../actions/stripe";
import { difDays } from "../../actions/hotel";
import { Link, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
    h,
    handleHotelDelete = (f) => f,
    owner = false,
    showViewMoreButton = true,
}) => {
    const diff = difDays(h.from, h.to);
    const navigate = useNavigate();

    const handleNextPage = () => navigate(`hotel/${h._id}`);

    return (
        <>
            <div className="card shadow-sm rounded-4 overflow-hidden mb-3">
                {/* IMAGE */}
                <div className="position-relative">
                    <img
                        src={
                            h.image && h.image.contentType
                                ? `${process.env.REACT_APP_API}/hotel/image/${h._id}`
                                : "https://placehold.co/600x400?text=MERN+Booking"
                        }
                        alt={h.title}
                        className="img-fluid w-100"
                        style={{ height: "200px", objectFit: "cover" }}
                    />

                    {/* OWNER ICONS - top-right on image */}
                    {owner && (
                        <div className="position-absolute top-0 end-0 p-2 d-flex gap-2">
                            <Link
                                to={`/hotel/edit/${h._id}`}
                                className="btn btn-light btn-sm rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                                style={{ width: 32, height: 32 }}
                                title="Edit"
                            >
                                <EditOutlined className="text-warning" style={{ fontSize: 15 }} />
                            </Link>
                            <button
                                onClick={() => handleHotelDelete(h._id)}
                                className="btn btn-light btn-sm rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center"
                                style={{ width: 32, height: 32 }}
                                title="Delete"
                            >
                                <DeleteOutlined className="text-danger" style={{ fontSize: 15 }} />
                            </button>
                        </div>
                    )}
                </div>

                {/* BODY - mobile-first */}
                <div className="card-body">
                    {/* HIGHLIGHTED TITLE */}
                    <h5 className="fw-bold mt-2 mb-2">{h.title}</h5>

                    {/* HIGHLIGHTED ADDRESS */}
                    <p className="mb-2">
                        <span className="badge bg-light text-dark fw-normal px-2 py-1">
                            <i className="bi bi-geo-alt text-primary me-1" />
                            {h.location}
                        </span>
                    </p>

                    {/* PRICE CHIP */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-dark fs-6">
                            {currencyFormatter({ amount: h.price, currency: "usd" })}
                        </span>
                        <small className="text-muted">
                            {diff} {diff <= 1 ? "day" : "days"} · {h.bed} bed
                        </small>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="small text-secondary mb-3">
                        {h.content.substring(0, 120)}…
                    </p>
                    {showViewMoreButton && (
                        <div className="mt-auto">
                            <button
                                onClick={handleNextPage}
                                className="btn btn-primary btn-sm px-3 w-100"
                            >
                                Show more
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};


export default SmallCard;