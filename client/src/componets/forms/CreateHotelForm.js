import { PlaceKit } from '@placekit/autocomplete-react';
import '@placekit/autocomplete-js/dist/placekit-autocomplete.css';
import { DatePicker, Select } from 'antd';
import moment from "moment";


const { Option } = Select;

const CreateHotelForm = (props) => {
    const {
        values,
        setValues,
        handleChange,
        handleImageChange,
        handleSubmit,
        location,
        setLocation
    } = props;
     const {title , content, price} = values;
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="btn btn-outline-secondary btn-block m-2 text-left">
                        upload Image
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"
                            hidden
                        />
                    </label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Title"
                        value={title}
                        className="form-control m-2"
                    />
                    <textarea
                        name="content"
                        onChange={handleChange}
                        placeholder="content"
                        value={content}
                        className="form-control m-2"
                    />
                    {/* ✅ PlaceKit Autocomplete */}
                    <PlaceKit
                        apiKey={process.env.REACT_APP_PLACEKIT_API_KEY}
                        placeholder="Search location..."
                        options={{
                            // countries: ["in"],
                            language: "en",
                        }}
                        onPick={(value, item) => {
                            setLocation(value);
                            setValues({ ...values, location: value }); // just save the address string
                        }}
                        className="form-control m-2 "
                        defaultValue={location}
                    />

                    <input
                        type="number"
                        name="price"
                        onChange={handleChange}
                        placeholder="Price"
                        value={price}
                        className="form-control m-2"
                    />
                    {/* <input
                        type="number"
                        name="bed"
                        onChange={handleChange}
                        placeholder="Number of Beds"
                        value={bed}
                        className="form-control m-2"
                    /> */}
                    <Select onChange={(value) => setValues({ ...values, bed: value })}
                        className="w-100 m-2"
                        size='large'
                        placeholder='Number of beds'
                    >
                        <Option key={1}>{1}</Option>
                        <Option key={2}>{2}</Option>
                        <Option key={3}>{3}</Option>
                        <Option key={4}>{4}</Option>
                        <Option key={5}>{5}</Option>
                    </Select>

                </div>
                <DatePicker
                    placeholder="From date"
                    className="form-control m-2"
                    onChange={(date, dateString) => setValues({ ...values, from: dateString })}
                    disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}
                />
                <DatePicker
                    placeholder="To date"
                    className="form-control m-2"
                    onChange={(date, dateString) => setValues({ ...values, to: dateString })}
                    disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}
                />
                <button className="btn btn-outline-primary m-2">Save</button>
            </form>
        </>
    )
};

export default CreateHotelForm;