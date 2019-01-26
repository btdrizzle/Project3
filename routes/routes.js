const router = require("express").Router();
const db = require("../models");
require("dotenv").config();

router.post("/weather/:station", (req, res) => {
    const { station } = req.params;
    const info = req.body;
    console.log(info);
    db.Station.findOne({ _id: station })
        .then((data) => {
            db.Weather.create({ station: data._id, name: info.name })
                .then((weatherData) => {
                    res.status(200).json(weatherData);
                }).catch(err => console.log(err));
        }).catch(err => res.json(err));
});

/* router.get("/weather/:station", (req,res) => {

}) */

module.exports = router;
