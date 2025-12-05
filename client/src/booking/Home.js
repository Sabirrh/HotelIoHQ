import { allHotels } from "../actions/hotel";
import SmallCard from "../componets/Card/SmallCard";
import Search from "../componets/forms/Search";
const { useState } = require("react");
// const { allHotels } = require("../../actions/hotel");
const { useEffect } = require("react");
const Home = () => {
  const [hotels, setHotel] = useState([]);

  useEffect(() => {
    loadallhotels();

  }, [])

  const loadallhotels = async () => {
    const res = await allHotels();
    setHotel(res.data);
  }
  // return (
  //   <>

  //     <div className="container-fluid bg-secondary p-5 text-center">
  //       <h1>All Hotels</h1>
  //     </div>
  //     <div className="col">
  //       <br />
  //       <Search />
  //     </div>
  //     <div className="container-fluid">
  //       <br />
  //       {/* {JSON.stringify(hotels, null,4)} */}
  //       {hotels.map((h) =>
  //         <SmallCard
  //           key={h._id}
  //           h={h}
  //         />)}
  //     </div>
  //   </>
  // )

  return (
    <>
      {/* Hero */}
      <div className="bg-dark text-white py-5 mb-4">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Find Your Perfect Stay</h1>
          <p className="lead mb-0">Browse our curated collection of hotels</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <Search />
          </div>
        </div>
      </div>

      {/* Hotel grid */}
      <div className="container mb-5">
        <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
          {hotels.map((h) => (
            <div key={h._id} className="col d-flex align-items-stretch">
              <SmallCard h={h} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;