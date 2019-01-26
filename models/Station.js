var mongoose = require("mongoose");
const findOrCreate = require('mongoose-find-or-create')

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var StationSchema = new Schema({
  // `title` is required and of type String
  name: {
    type: String
  },
  // `link` is required and of type String
  lat: {
      type:Number,
      required: true
  },
  lon: {
    type: Number,
    required: true
    }
});

StationSchema.plugin(findOrCreate)

var Station = mongoose.model("Station", StationSchema);

module.exports = Station;
