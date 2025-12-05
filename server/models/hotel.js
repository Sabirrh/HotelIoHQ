const mongoose = require ("mongoose");

const { ObjectId } = mongoose.Schema;

const hotelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required"
    },
    content: {
        type: String,
        required: "Content is required",
        maxlength: 10000,
    },
    location: {
        type: String,
    },
    price: {
        type: Number,
        required: "Price is required"
    },
    postedBy: {
        type:ObjectId,
        ref: "User"
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    },
    bed: {
        type: Number
    },
 },
 {timestamps:true}
)

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;