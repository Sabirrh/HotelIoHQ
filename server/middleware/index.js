// middleware/index.js
require('dotenv').config();
const { expressjwt } = require('express-jwt');
const Hotel = require('../models/hotel');

const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET, // ✅ use static string
  algorithms: ["HS256"],
  requestProperty: "user", 
});


const hotelOwner = async(req,res,next) => {
 let hotel = await Hotel.findById(req.params.hotelId).exec();
 let owner = hotel.postedBy._id.toString() === req.user._id.toString();
 if(!owner){
  return res.status(403).send("Unauthorize")
 }
 next();
}

module.exports = {requireSignin,hotelOwner};
