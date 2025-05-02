const asyncHandler = require("../middleware/asyncHandler");
const Cars = require("../model/car");
const MyError = require("../utils/myError");

exports.updateUserRank = asyncHandler(async (req, res, next) => {
  const cars = await Cars.find();

  if (!cars) {
    throw new MyError("Машин олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: cars });
});
