const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  homeLocationCoords: String,
  homeLocationName: String,
  workLocationCoords: String,
  workLocationName: String,
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Address", AddressSchema);
