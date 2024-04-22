const mongoose = require("mongoose");

const UserCarSchema = new mongoose.Schema({
  mainId: String,
  mainImg: String,
  firmId: Number,
  markId: Number,
  firmName: String,
  markName: String,
  mainDate: String,
  paletteNumber: {
    type: String,
    unique: [true, "Дугаар бүртгэлтэй байна"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("userCars", UserCarSchema);
