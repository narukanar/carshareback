const asyncHandler = require("../middleware/asyncHandler");
const UserCar = require("../model/userCar");
const User = require("../model/user");
const MyError = require("../utils/myError");
const { isEmpty } = require("lodash");
const path = require("path");

exports.deleteUserCar = asyncHandler(async (req, res, next) => {
  const car = await UserCar.findByIdAndDelete(req.params.id);

  if (!car) {
    throw new MyError("Машин олдсонгүй", 400);
  }

  res.status(200).json({ success: true, data: car });
});

exports.getUserCars = asyncHandler(async (req, res, next) => {
  const car = await UserCar.find({ userId: req.params.userId });

  if (!car) {
    throw new MyError("Машин олдсонгүй", 400);
  }

  res.status(200).json({ success: true, data: car });
});

exports.addUserCar = asyncHandler(async (req, res, next) => {
  const car = await UserCar.create({
    ...req.body,
    userId: req.params.userId,
  });
  if (!car) {
    throw new MyError("Машин нэмэгдэхэд алдаа гарлаа", 400);
  }

  res.status(200).json({ success: true, data: car });
});

exports.updateUserCar = asyncHandler(async (req, res, next) => {
  const car = await UserCar.findOneAndUpdate(
    { userId: req.params.userId },
    { ...req.body, userId: req.params.userId },
    { new: true }
  );

  if (!car) {
    throw new MyError("Хэрэглэгч дээр тухайн байршил олдсонгүй!");
  }

  res.status(200).json({ success: true, data: car });
});

exports.getDrivers = asyncHandler(async (req, res, next) => {
  const userIdWithCar = await UserCar.find().distinct("userId");
  const users = await User.findById(userIdWithCar);

  if (!users) {
    throw new MyError("Хэрэглэгч олдсонгүй", 400);
  }

  res.status(200).json({ success: true, data: users });
});

exports.getDriversName = asyncHandler(async (req, res, next) => {
  const userIdWithCar = await UserCar.find().distinct("userId");

  let users = [];
  if (userIdWithCar) {
    for (let i = 0; i < userIdWithCar.length; i++) {
      const user = await User.find({
        _id: userIdWithCar[i],
        firstName: { $regex: req.params.name },
      });
      if (!isEmpty(user)) {
        users.push(user[0]);
      }
    }
  }
  res.status(200).json({ success: true, data: users });
});

exports.uploadUserCarPicture = asyncHandler(async (req, res, next) => {
  const car = await UserCar.findById(req.params.id);

  if (!car) {
    throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүй.", 400);
  }

  // image upload
  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.COMPANY_LOGO_PATH}/${file.name}`, async (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    car.mainImg = `${file.name}`;
    await car.save();

    res.status(200).json({
      success: true,
      data: car,
    });
  });
});
