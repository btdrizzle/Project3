const router = require("express").Router();
// const axios = require("axios");
const db = require("../models");
require("dotenv").config();


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

router.get("/weather/:station", (req, res) => {
    const { station } = req.params;
    db.Station.findOne({ _id: station })
        .then((data) => {
            db.Weather.find({ station: data._id })
                .then((weatherData) => {
                    res.status(200).json(weatherData);
                }).catch(err => console.log(err));
        }).catch(err => res.json(err));
});

/* router.get("/weather/weatherbit/", (req,res) => {
    const baseURL = "http://http://api.weatherbit.io/v2.0/history/daily?";
    const KEY = process.env.API_Key;
    const body = req.body;

}) */

module.exports = router;
