const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  passengerUserId: {
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
  status: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("notification", NotificationSchema);
