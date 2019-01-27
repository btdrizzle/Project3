var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var WeatherSchema = new Schema({
  // `title` is required and of type String
  station: {
    type: Schema.Types.ObjectId
  },
  // `link` is required and of type String
  date: {
    type: Date,
    default: Date.now()
    },
  wind_speed: {
    type: Number
    },
  wind_gust: {
    type: Number
    },
  wind_average: {
    type: Number
    },
  rainfall_amt: {
    type: Number
    },
  humidity: {
    type: Number
    },
  pressure: {
    type: Number
    },
  ambient_temp: {
    type: Number
    },
  ground_temp: {
    type: Number
    },
});

var Weather = mongoose.model("Weather", WeatherSchema);

module.exports = Weather;
