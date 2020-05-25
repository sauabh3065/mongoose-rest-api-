const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const leaderSchema = new  Schema(
  {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    default: "null",
  },
  abbr: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "no description",
  },
  featured: {
    type: Boolean,
    default: false,
  } },
  {
    timestamps:true
  }
);

const Leaders = mongoose.model("leader",leaderSchema);

module.exports = Leaders;