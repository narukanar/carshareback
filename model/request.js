const { toInteger } = require("lodash");
const mongoose = require("mongoose");

const RequestShema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Огноо оруулна уу!"],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  driverId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  driverRouteId: {
    type: mongoose.Schema.ObjectId,
    ref: "driverRoute",
  },
  status: String,
});

module.exports = mongoose.model("Request", RequestShema);
