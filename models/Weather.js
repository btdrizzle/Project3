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
  name: {
    type:String
  },
  date: {
    type: Date,
    default: Date.now()
    },
  synopsis: {
    type: String,

    },
  thumbnail: {
    type: String,

    },
  link: {
    type: String,
  }
});

var Weather = mongoose.model("Weather", WeatherSchema);

module.exports = Weather;
