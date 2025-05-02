const asyncHandler = require("../middleware/asyncHandler");
const UserRoute = require("../model/userRoute");
const MyError = require("../utils/myError");
const { isEmpty } = require("lodash");

exports.getAllDriverRoute = asyncHandler(async (req, res, next) => {
  const date = new Date(Date.now() - 60 * 60 * 1000);
  const route = await UserRoute.find({ date: { $gte: date } }).populate(
    "userId"
  );

  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: route });
});

exports.getUserRoute = asyncHandler(async (req, res, next) => {
  const date = new Date(Date.now() - 60 * 60 * 1000);
  const route = await UserRoute.find({
    userId: req.params.userId,
    date: { $gte: date },
  }).populate("userId");

  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: route });
});

exports.addUserRoute = asyncHandler(async (req, res, next) => {
  const before = await UserRoute.find({
    fromLocationCoords: req.body.fromLocationCoords,
    fromLocationName: req.body.fromLocationName,
    toLocationCoords: req.body.toLocationCoords,
    toLocationName: req.body.toLocationName,
    date: req.body.date,
    userId: req.params.userId,
  });
  if (before && Array.isArray(before) && before.length > 0) {
    throw new MyError("Өмнө энэ чиглэлийг оруулсан байна.", 204);
  }
  const route = await UserRoute.create({
    ...req.body,
    userId: req.params.userId,
  });

  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл нэмэгдэхэд алдаа гарлаа", 500);
  }

  res.status(200).json({ success: true, data: route });
});

exports.updateUserRoute = asyncHandler(async (req, res, next) => {
  const route = await UserRoute.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл алдаа гарлаа", 500);
  }

  res.status(200).json({ success: true, data: route });
});

exports.getSameRouteUsers = asyncHandler(async (req, res, next) => {
  const route = await UserRoute.find({
    toLocation: req.params.location,
  }).populate("userId");

  if (!route) {
    throw new MyError("Тухайн чиглэл рүү хамт явах зорчигч олдсонгүй", 402);
  }

  res.status(200).json({ success: true, data: route });
});

exports.deleteUserRoute = asyncHandler(async (req, res, next) => {
  const route = await UserRoute.findByIdAndDelete(req.params.id);

  if (!route) {
    throw new MyError("Тухайн чиглэл рүү хамт явах зорчигч олдсонгүй", 402);
  }

  res.status(200).json({ success: true, data: route });
});
