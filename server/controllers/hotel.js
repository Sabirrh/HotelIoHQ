const Hotel = require('../models/hotel');
const fs = require('fs');
const order = require('../models/order');

const create = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        console.log("RAW FIELDS:", fields);
        console.log("RAW FILES:", files);

        // ---------------------------------------
        // 1️⃣ FLATTEN ARRAYS (Formidable gives arrays)
        // ---------------------------------------
        Object.keys(fields).forEach((key) => {
            if (Array.isArray(fields[key])) {
                fields[key] = fields[key][0];
            }
        });

        // ---------------------------------------
        // 2️⃣ TYPE CONVERSIONS
        // ---------------------------------------
        if (fields.price) fields.price = Number(fields.price);
        if (fields.bed) fields.bed = Number(fields.bed);
        if (fields.from) fields.from = new Date(fields.from);
        if (fields.to) fields.to = new Date(fields.to);

        // ---------------------------------------
        // 3️⃣ ENSURE USER IS LOGGED IN
        // ---------------------------------------
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // ---------------------------------------
        // 4️⃣ SET postedBy (IMPORTANT — DO THIS LAST)
        // ---------------------------------------
        fields.postedBy = req.user._id;

        console.log("FINAL FIELDS BEFORE SAVE:", fields);

        // ---------------------------------------
        // 5️⃣ CHECK IMAGE
        // ---------------------------------------
        if (!files || !files.image) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const imageFile = Array.isArray(files.image)
            ? files.image[0]
            : files.image;

        // ---------------------------------------
        // 6️⃣ CREATE HOTEL DOCUMENT
        // ---------------------------------------
        const hotel = new Hotel({
            ...fields,              // Spread all fields
            postedBy: req.user._id, // DOUBLE GUARANTEE
        });

        // ---------------------------------------
        // 7️⃣ ATTACH IMAGE DATA
        // ---------------------------------------
        if (imageFile?.filepath) {
            hotel.image.data = fs.readFileSync(imageFile.filepath);
            hotel.image.contentType = imageFile.mimetype || imageFile.type;
        } else {
            return res.status(400).json({
                error: "Image file path not found",
                imageFile,
            });
        }

        // ---------------------------------------
        // 8️⃣ SAVE TO DATABASE
        // ---------------------------------------
        const savedHotel = await hotel.save();

        // ---------------------------------------
        // 9️⃣ DELETE TEMP UPLOADED FILE
        // ---------------------------------------
        fs.unlink(imageFile.filepath, (err) => {
            if (err) console.error("Error deleting temp file:", err);
        });

        // ---------------------------------------
        // 🔟 SEND RESPONSE
        // ---------------------------------------
        res.json(savedHotel);

    } catch (err) {
        console.error("❌ Error creating hotel:", err);
        res.status(400).json({ error: err.message });
    }
};


const hotels = async (req, res) => {
    // const all = await Hotel.find({ from:{$gte: new Date() }})
    const all = await Hotel.find({}).limit(24).select('-image.data')
        .populate('postedBy', '_id name')
        .exec();
    // console.log(all);
    res.json(all);
}

const image = async (req, res) => {
    const hotel = await Hotel.findById(req.params.hotelId).exec();
    if (hotel && hotel.image && hotel.image.data !== null) {
        res.set('Contenct-Type', hotel.image.contentType)
        return res.send(hotel.image.data);
    }
}

const sellerHotels = async (req, res) => {
    const all = await Hotel.find({ postedBy: req.user._id })
        .select('-image.data')
        .populate('postedBy', '_id name')
        .exec();
    // console.log(all);
    res.send(all);
}

const remove = async (req, res) => {
    let removed = await Hotel.findByIdAndDelete(req.params.hotelId).select("-image.data").exec();
    res.json(removed);
}

const read = async (req, res) => {
    let hotel = await Hotel.findById(req.params.hotelId)
        .populate("postedBy", "_id name")
        .select("-image.data")
        .exec();
    // console.log("single Hotel", hotel);
    res.json(hotel);
}

const update = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        // Flatten any array-type fields
        Object.keys(fields).forEach((key) => {
            if (Array.isArray(fields[key])) {
                fields[key] = fields[key][0];
            }
        });

        // Convert numeric/date fields
        if (fields.price) fields.price = Number(fields.price);
        if (fields.bed) fields.bed = Number(fields.bed);
        if (fields.from) fields.from = new Date(fields.from);
        if (fields.to) fields.to = new Date(fields.to);


        let data = { ...fields }
        // if (files.image) {
        //     let image = {}
        //     image.data = fs.readFileSync(files.image.path);
        //     image.contentType = files.image.type;

        //     data.image = image;
        // }
        if (files.image) {
            let imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

            if (imageFile.filepath) {
                let image = {};
                image.data = fs.readFileSync(imageFile.filepath);
                image.contentType = imageFile.mimetype || imageFile.type;
                data.image = image;
            } else {
                console.error("No filepath found in uploaded file");
            }
        }
        let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data,
            {
                new: true
            }).select("-image.data");
        res.json(updated)
    } catch (err) {
        console.log(err);
        res.status(400).send("Hotel Update failed. Try again.")
    }
}

const userHotelBookings = async (req, res) => {
    const all = await order.find({ orderBy: req.user._id })
        .select('session')
        .populate('hotel', '-image.data')
        .populate('orderBy', '_id name')
        .exec();
    res.json(all);
}

const isAlreadyBooked = async (req, res) => {
    const { hotelId } = req.params;
    // find orders of the currently logged in user
    const userOrders = await order.find({ orderBy: req.user._id })
        .select('hotel')
        .exec();

    //check if hotel id is found in userOrders array
    let ids = []
    for (let i = 0; i < userOrders.length; i++) {
        ids.push(userOrders[i].hotel.toString());
    }

    res.json({
        ok: ids.includes(hotelId),
    });

}

const searchListing = async (req, res) => {
    const { location, date, bed } = req.body;
    // console.log("Requested Body: ", location,date,bed)
    const fromDate = date.split(",")
    let result = await Hotel.find({ from: { $gte: new Date(fromDate[0]) }, location })
        .select('-image.data')
        .exec();
    res.json(result); 
}
/**
 * if you want to be more specific
  let result = await Listing.find({
  from:{$gte: new Date()},
  to:{$lte:to},
  location,
  bed
  })
 */

module.exports = { create, hotels, image, sellerHotels, remove, read, update, userHotelBookings, isAlreadyBooked, searchListing };

