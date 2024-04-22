const asyncHandler = require("../middleware/asyncHandler");
const Notification = require("../model/notification");
const MyError = require("../utils/myError");

exports.getUserAllNotification = asyncHandler(async (req, res, next) => {
  const notif = await Notification.find({
    $or: [
      { passengerUserId: req.params.userId },
      { driverId: req.params.userId },
    ],
  })
    .populate("passengerUserId")
    .populate("driverId")
    .populate("driverRouteId");

  if (!notif) {
    throw new MyError("Хэрэглэгчийн notification дуудахад алдаа гарлаа", 400);
  }
  res.status(200).json({ success: true, data: notif });
});

exports.addNotification = asyncHandler(async (req, res, next) => {
  const notif = await Notification.create(req.body);

  if (!notif) {
    throw new MyError("Notification нэмэхэд алдаа гарлаа", 400);
  }

  res.status(200).json({ success: true, data: notif });
});

exports.deleteNotification = asyncHandler(async (req, res, next) => {
  const notif = await Notification.findByIdAndDelete(req.params.id);

  if (!notif) {
    throw new MyError("Notification устгахад алдаа гарлаа", 400);
  }

  res.status(200).json({ success: true, data: notif });
});
