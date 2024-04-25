const asyncHandler = require("../middleware/asyncHandler");
const Request = require("../model/request");
const MyError = require("../utils/myError");

exports.getDriverRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.find({
    driverId: req.params.driverId,
  }).populate("userId");

  if (!requests) {
    throw new MyError("Машин олдсонгүй", 400);
  }

  res.status(200).json({ success: true, data: requests });
});

exports.createDriverRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.create(req.body);
  if (!requests) {
    throw new MyError("Машин нэмэгдэхэд алдаа гарлаа", 400);
  }

  res.status(200).json({ success: true, data: requests });
});
exports.updateDriverRequests = asyncHandler(async (req, res, next) => {
  const requests = await Request.findByIdAndUpdate(req.params.id, req.body);
  if (!requests) {
    throw new MyError("Машин нэмэгдэхэд алдаа гарлаа", 400);
  }

  res.status(200).json({ success: true, data: requests });
});
