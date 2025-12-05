import { BorderInnerOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useState } from "react";
import queryString from 'query-string'
import { searchListing } from "../actions/hotel";
import SmallCard from "../componets/Card/SmallCard";
import Search from "../componets/forms/Search";

const SearchResult = () => {
    const [searchLocation, setSearchLocation]=useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchBed, setSearchBed] = useState('');
    const [hotels, setHotels] = useState([]);
// params from url to send search query to backend
    useEffect(() => {
        const {location,date,bed} = queryString.parse(window.location.search);
        // console.table({location,data,bed})
            searchListing({location,date,bed}).then(res => {
                console.log('Searched Data', res.data)
                setHotels(res.data)
            })
    },[window.location.search])
    return(
        <>
        <div className="col">
          <br />
          <Search />
        </div>
            <div className="container">
            <div className="row">
                {hotels.map(h => <SmallCard key={h._id} h={h} />)}
            </div>
        </div>
        </>
    )
}
export default SearchResult;