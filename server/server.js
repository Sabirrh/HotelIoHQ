const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Port = process.env.PORT || 8000;
const app = express();

mongoose
    .connect(process.env.MONGODB_URI, {
       
    })
    .then(() => console.log('DB Connected'))
    .catch((err) => console.error(' DB Connection Error:', err));

// Middleware to parse JSON
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
//route middleware 
fs.readdirSync('./routes').forEach((file) => {
    const route = require(`./routes/${file}`);
    app.use('/api', route);
});
app.listen(Port, () => {
    console.log(`App is running at port ${Port}`)
})