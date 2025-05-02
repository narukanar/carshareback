const asyncHandler = require("../middleware/asyncHandler");
const Cars = require("../model/car");
const MyError = require("../utils/myError");

exports.getAllCars = asyncHandler(async (req, res, next) => {
  const cars = await Cars.find();

  if (!cars) {
    throw new MyError("Машин олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: cars });
});

exports.getFirmAllCars = asyncHandler(async (req, res, next) => {
  const cars = await Cars.find({ firmId: req.params.firmId }).sort({
    markName: 1,
  });

  if (!cars) {
    throw new MyError("Машин олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: cars });
});

exports.getSameCars = asyncHandler(async (req, res, next) => {
  const cars = await Cars.find({
    markId: req.params.markId,
    firmId: req.params.firmId,
  }).sort({ mainDate: -1 });

  if (!cars) {
    throw new MyError("Машин олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: cars });
});

exports.createCar = asyncHandler(async (req, res, next) => {
  const cars = await Cars.create(req.body);

  if (!cars) {
    throw new MyError("Машин олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: cars });
});
