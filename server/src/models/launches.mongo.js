const mongoose = require("mongoose");

//creating the SCHEMA
//and setting how it is going to be
//SO IMPORTANT TO VALIDATE INFORMATION
const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    // default: 100,
    // min: 100,
    // max: 999,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    //type: mongoose.ObjectId, //it would be difficult to mixed tables here cause its NOSQL
    //ref: "Planet",
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  succes: {
    type: Boolean,
    required: true,
    default: true,
  },
});

//Creating the MODEL to make an OBJECT to interact with it
//the first argument is going to be transformed in plural and in lowerCase cause all COLLECTIONS in MONGODB have to have this PATTERN name
module.exports = mongoose.model("Launch", launchesSchema);
