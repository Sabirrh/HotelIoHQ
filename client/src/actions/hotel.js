import axios from "axios";


export const createHotel = async (token, data) =>
    await axios.post(`${process.env.REACT_APP_API}/create-hotel`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    })


export const allHotels = async () => await axios.get(`${process.env.REACT_APP_API}/hotels`)


export const difDays = (from, to) => {
    const day = 24 * 60 * 60 * 1000 // day in second
    const start = new Date(from);
    const end = new Date(to);
    const difference = Math.round(Math.abs((start - end) / day))
    return difference;
}

export const sellerHotels = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/seller-hotels`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }
    )

export const deleteHotel = async (token, hotelId) => await axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const read = async (hotelId) => {
    return await axios.get(`${process.env.REACT_APP_API}/hotel/${hotelId}`);
}


export const updateHotel = async (token, data, hotelId) =>
    await axios.put(`${process.env.REACT_APP_API}/update-hotel/${hotelId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
)

export const userHotelBookings = async (token) => {
    return await axios.get(`${process.env.REACT_APP_API}/user-hotel-bookings`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}    


export const isAlreadyBooked = async(token, hotelId) => {
    return axios.get(`${process.env.REACT_APP_API}/is-already-booked/${hotelId}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
}

export const searchListing = async(query) => {
    return await axios.post(`${process.env.REACT_APP_API}/search-listing`, query);
}