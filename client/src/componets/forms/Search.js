import { PlaceKit } from '@placekit/autocomplete-react';
import '@placekit/autocomplete-js/dist/placekit-autocomplete.css';
import { DatePicker, Select } from 'antd';
import moment from "moment";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Search = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [bed, setBed] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`);
  };

  return (
    <div className="container my-4">
      <div 
        className="d-flex flex-wrap bg-white shadow-sm p-3 rounded-4 align-items-center gap-2"
        style={{ maxWidth: "900px" }}
      >

        {/* LOCATION INPUT */}
        <div className="flex-grow-1">
          <PlaceKit
            apiKey={process.env.REACT_APP_PLACEKIT_API_KEY}
            placeholder="Where are you going?"
            options={{ language: "en" }}
            onPick={(value) => setLocation(value)}
            className="form-control border-0 shadow-none"
            defaultValue={location}
          />
        </div>

        {/* DATE PICKER */}
        <RangePicker
          className="m-2"
          onChange={(values) => {
            if (values) {
              const formatted = values.map(val => val.format("YYYY-MM-DD"));
              setDate(`${formatted[0]},${formatted[1]}`);
            }
          }}
          disabledDate={(current) => current && current < moment().startOf("day")}
        />

        {/* BED SELECT */}
        <Select
          className="m-2"
          placeholder="Beds"
          style={{ width: 120 }}
          onChange={(value) => setBed(value)}
        >
          <Option value="1">1 Bed</Option>
          <Option value="2">2 Beds</Option>
          <Option value="3">3 Beds</Option>
          <Option value="4">4 Beds</Option>
          <Option value="5">5 Beds</Option>
        </Select>

        {/* SEARCH BUTTON */}
        <button
          onClick={handleSubmit}
          className="btn btn-primary fw-semibold px-4 py-2 rounded-pill d-flex align-items-center"
        >
          <SearchOutlined className="me-2" />
          Search
        </button>

      </div>
    </div>
  );
};

export default Search;
