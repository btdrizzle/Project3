const mongoose = require("mongoose");
const db = require("../models");
require("dotenv").config();

// This file empties the Books collection and inserts the books below

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/weatherdata";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const jvStation = { name: "JV Station", lat: 29.882967, lon: -95.5662753 };

db.Station.findOrCreate(jvStation, (err, result) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(result);
    process.exit(0);
});
