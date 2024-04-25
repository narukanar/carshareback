const asyncHandler = require("../middleware/asyncHandler");
const CarFirm = require("../model/carFirm");
const MyError = require("../utils/myError");

exports.getAllCarFirms = asyncHandler(async (req, res, next) => {
  const carFirms = await CarFirm.find().sort({ firm: 1 });
  console.log("carFirms", carFirms);

  if (!carFirms) {
    throw new MyError("Машин олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: carFirms });
});

exports.getCarFirms = asyncHandler(async (req, res, next) => {
  const carFirms = await CarFirm.find({ id: req.params.id });

  if (!carFirms) {
    throw new MyError("Машин олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: carFirms });
});

exports.createCarFirm = asyncHandler(async (req, res, next) => {
  const resp = await CarFirm.create(req.body);
  if (!resp) {
    throw new MyError("Машин олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: resp });
});
