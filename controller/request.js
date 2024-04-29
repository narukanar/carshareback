const asyncHandler = require("../middleware/asyncHandler");
const Request = require("../model/request");
const Notification = require("../model/notification");
const MyError = require("../utils/myError");

exports.getDriverRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.find({
    driverId: req.params.driverId,
  })
    .populate("driverRouteId")
    .populate("userId");

  if (!requests) {
    throw new MyError("Хүсэлт олдсонгүй", 400);
  }

  res.status(200).json({ success: true, data: requests });
});

exports.createDriverRequests = asyncHandler(async (req, res, next) => {
  const before = await Request.find(req.body);
  if (before && Array.isArray(before) && before.length > 0) {
    throw new MyError("Өмнө хүсэлт явуулсан байна.", 204);
  }
  const requests = await Request.create(req.body);
  if (!requests) {
    throw new MyError("Хүсэлт нэмэхэд алдаа гарлаа", 400);
  }

  res.status(200).json({ success: true, data: requests });
});
exports.updateDriverRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.findByIdAndUpdate(req.params.id, req.body);
  if (!requests) {
    throw new MyError("Хүсэлт засахад алдаа гарлаа", 400);
  }
  const notification = {
    passengerUserId: req.body.userId,
    driverId: req.body.driverId,
    userRouteId: null,
    driverRouteId: req.body.driverRouteId,
    status: req.body.status,
  };
  await Notification.create(notification);

  res.status(200).json({ success: true, data: requests });
});
