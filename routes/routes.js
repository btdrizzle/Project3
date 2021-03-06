const router = require("express").Router();
const axios = require("axios");
const moment = require("moment");
const db = require("../models");
require("dotenv").config();

const today = moment().startOf("day");


router.post("/weather/:station", (req, res) => {
    const { station } = req.params;
    const info = req.body;
    console.log(info);
    db.Station.findOne({ _id: station })
        .then((data) => {
            const newWeatherData = {
                station: data._id,
                wind_speed: info.wind_speed,
                wind_gust: info.wind_gust,
                wind_average: info.wind_average,
                rainfall_amt: info.rainfall_amt,
                humidity: info.humidity,
                pressure: info.pressure,
                ambient_temp: info.ambient_temp,
                ground_temp: info.ground_temp,
            };
            db.Weather.create(newWeatherData)
                .then((weatherData) => {
                    res.status(200).json(weatherData);
                }).catch(err => console.log(err));
        }).catch(err => res.json(err));
});

router.get("/stations", (req, res) => {
    db.Station.find({})
        .then((data) => {
            res.json(data);
        });
});

router.get("/weather/:station", (req, res) => {
    const { station } = req.params;
    db.Station.findOne({ _id: station })
        .then((data) => {
            console.log(today);
            db.Weather.find({ $and: [{ station: data._id }, { date: { $gte: `${today}` } }] })
                .then((weatherData) => {
                    res.json(weatherData);
                }).catch(err => console.log(err));
        }).catch(err => res.json(err));
});

router.get("/weatherbit/", (req, res) => {
    const baseURL = "http://api.weatherbit.io/v2.0/history/daily?";
    const { query } = req;
    console.log({ query });
    axios.get(`${baseURL}start_date=${query.today}&end_date=${query.tomorrow}&city=${query.city},${query.state}&key=${process.env.API_KEY}`)
        .then((data) => {
            res.json(data.data);
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;
