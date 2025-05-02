const asyncHandler = require("../middleware/asyncHandler");
const Address = require("../model/address");
const MyError = require("../utils/myError");
const { isEmpty } = require("lodash");

exports.getUserAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.find({ userId: req.params.userId });

  if (!address) {
    throw new MyError("Хаяг олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: address });
});

exports.getUserHomeAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findOne({ userId: req.params.userId });

  if (!address) {
    throw new MyError("Хаяг олдсонгүй", 500);
  }

  res.status(200).json({
    success: true,
    data: {
      homeLocationName: address.homeLocationName,
      homeLocationCoords: address.homeLocationCoords,
    },
  });
});

exports.addUserHomeAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findOne({ userId: req.params.userId });
  let newAddress = "";
  if (!address) {
    newAddress = await Address.create({
      ...req.body,
      userId: req.params.userId,
    });
    if (!newAddress) {
      throw new MyError("Хаяг нэмэгдэхэд алдаа гарлаа", 500);
    }
  } else if (!isEmpty(address.homeLocation)) {
    throw new MyError("Тухайн хэрэглэгч дээр хаяг нэмэгдсэн байна.", 500);
  } else if (isEmpty(address.homeLocation)) {
    address.homeLocationName = req.body.homeLocationName;
    address.homeLocationCoords = req.body.homeLocationCoords;
    await address.save();
    newAddress = address;
  }

  res.status(200).json({ success: true, data: newAddress });
});

exports.updateUserHomeAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findOneAndUpdate(
    { userId: req.params.userId },
    { ...req.body, userId: req.params.userId },
    { new: true }
  );

  if (!address) {
    throw new MyError("Хэрэглэгч дээр тухайн байршил олдсонгүй!");
  }

  res.status(200).json({ success: true, data: address });
});

exports.getUserWorkAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findOne({ userId: req.params.userId });

  if (!address) {
    throw new MyError("Хаяг олдсонгүй", 500);
  }

  res.status(200).json({
    success: true,
    data: {
      workLocationName: address.workLocationName,
      workLocationCoords: address.workLocationCoords,
    },
  });
});

exports.addUserWorkAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findOne({ userId: req.params.userId });
  let newAddress = "";
  if (!address) {
    newAddress = await Address.create({
      ...req.body,
      userId: req.params.userId,
    });
    if (!newAddress) {
      throw new MyError("Хаяг нэмэгдэхэд алдаа гарлаа", 500);
    }
  } else if (
    !isEmpty(address.workLocationCoords) &&
    !isEmpty(address.workLocationName)
  ) {
    throw new MyError("Тухайн хэрэглэгч дээр хаяг нэмэгдсэн байна.", 500);
  } else if (isEmpty(address.workLocation)) {
    address.workLocationCoords = req.body.workLocationCoords;
    address.workLocationName = req.body.workLocationName;
    await address.save();
    newAddress = address;
  }

  res.status(200).json({ success: true, data: newAddress });
});

exports.updateUserWorkAddress = asyncHandler(async (req, res, next) => {
  const address = await Address.findOneAndUpdate(
    { userId: req.params.userId },
    { ...req.body, userId: req.params.userId },
    { new: true }
  );

  if (!address) {
    throw new MyError("Хэрэглэгч дээр тухайн байршил олдсонгүй!");
  }
  res.status(200).json({ success: true, data: address });
});
