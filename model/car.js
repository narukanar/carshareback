const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  mainId: String,
  mainImg: String,
  firmId: Number,
  markId: Number,
  firmName: String,
  markName: String,
  mainDate: String,
});

module.exports = mongoose.model("cars", CarSchema);
