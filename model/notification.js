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
  userRouteId: {
    type: mongoose.Schema.ObjectId,
    ref: "UserRoutes",
  },
  driverRouteId: {
    type: mongoose.Schema.ObjectId,
    ref: "DriverRoutes",
  },
});

module.exports = mongoose.model("notification", NotificationSchema);
