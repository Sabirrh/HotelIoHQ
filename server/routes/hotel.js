const express = require('express');
const { create, hotels, image, sellerHotels, remove, read, update, userHotelBookings, isAlreadyBooked,searchListing } = require('../controllers/hotel');
const parseForm = require('../middleware/formidable');
const { requireSignin, hotelOwner } = require('../middleware');

const router = express.Router();

router.post('/create-hotel', requireSignin, parseForm, create)
router.get('/hotels', hotels)
router.get('/hotel/image/:hotelId', image);
router.get('/seller-hotels', requireSignin, sellerHotels)
router.delete('/delete-hotel/:hotelId', requireSignin, hotelOwner, remove)
router.get('/hotel/:hotelId', read)
router.put('/update-hotel/:hotelId',
    requireSignin,
    hotelOwner,
    parseForm,
    update
);
router.get('/user-hotel-bookings', requireSignin, userHotelBookings)
router.get('/is-already-booked/:hotelId', requireSignin, isAlreadyBooked)
router.post('/search-listing', searchListing)
module.exports = router;