const { toInteger } = require("lodash");
const mongoose = require("mongoose");

const RequestShema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
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
    ref: "DriverRoute",
  },
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Request", RequestShema);
