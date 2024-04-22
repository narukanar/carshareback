const mongoose = require("mongoose");

const CarFirmSchema = new mongoose.Schema({
  id: String,
  firm: String,
  firmCountryMon: String,
});

module.exports = mongoose.model("carFirms", CarFirmSchema);
