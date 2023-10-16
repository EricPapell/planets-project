const mongoose = require("mongoose");

//BE CONSITENT IN THE NAMES IN FRONT AND BACKEND
const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Planet", planetsSchema);
