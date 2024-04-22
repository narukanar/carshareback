const asyncHandler = require("../middleware/asyncHandler");
const History = require("../model/history");
const Trip = require("../model/trip");
const MyError = require("../utils/myError");
const { isEmpty } = require("lodash");

exports.getUserHistory = asyncHandler(async (req, res, next) => {
  const history = await Trip.find({
    $or: [{ userId: req.params.userId }, { driverId: req.params.userId }],
    // date: { $lt: Date.now() },
  })
    .populate("userRouteId")
    .populate("driverRouteId");
  if (!history) {
    throw new MyError("Түүх олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: history });
});

exports.getUserHistoryCount = asyncHandler(async (req, res, next) => {
  const history = await Trip.find({
    $or: [{ userId: req.params.userId }, { driverId: req.params.userId }],
    // date: { $lt: Date.now() },
  })
    .populate("userRouteId")
    .populate("driverRouteId");
  if (!history) {
    throw new MyError("Түүх олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: history.length });
});
exports.getUserHistory = asyncHandler(async (req, res, next) => {
  const history = await Trip.find({
    $or: [{ userId: req.params.userId }, { driverId: req.params.userId }],
    // date: { $lt: Date.now() },
  })
    .populate("userRouteId")
    .populate("driverRouteId");
  if (!history) {
    throw new MyError("Түүх олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: history });
});

exports.addUserHistory = asyncHandler(async (req, res, next) => {
  const history = await History.create({
    ...req.body,
    userId: req.params.userId,
  });

  if (!history) {
    throw new MyError("Түүх нэмэгдэхэд алдаа гарлаа", 500);
  }

  res.status(200).json({ success: true, data: history });
});

exports.updateUserHistory = asyncHandler(async (req, res, next) => {
  const history = await History.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!history) {
    throw new MyError("Түүх шинэчлэхэд алдаа гарлаа", 500);
  }

  res.status(200).json({ success: true, data: history });
});
