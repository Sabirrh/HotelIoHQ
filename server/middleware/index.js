//Redux setUp 
// using localStorage
// let userState = null;

// if (window !== 'undefined' && window.localStorage.getItem('auth')) {
//   userState = JSON.parse(window.localStorage.getItem('auth'));
// }
// // } else {
// //   userState = null;
// // }
// //2. create user reducer function
// export const authReducer = (state = userState, action) => {
//   // Each action should have like { type: 'LoggedInTime' , payload:'{ name:'Ryan', role:'seller' }'}
//   switch (action.type) {
//     case "LOGGED_IN_USER":
//       // Save to sessionStorage
//       if (typeof window !== 'undefined') {
//         window.sessionStorage.setItem('auth', JSON.stringify(action.payload));
//       }
//       // return { ...state, ...action.payload }
//       return action.payload
//     case 'LOGOUT':
//       if (typeof window !== 'undefined') {
//         window.sessionStorage.removeItem('auth');
//       }
//       return null
//     default:
//       return state;
//   }
// }


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
