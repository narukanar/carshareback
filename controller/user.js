const mongoose = require("mongoose");
const User = require("../model/user");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError.js");
const path = require("path");

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new MyError("Хэрэглэгчийн мэдээлэл засах амжилтгүй боллоо", 500);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!user) {
    throw new MyError("Хэрэглэгчийн мэдээлэл засах амжилтгүй боллоо", 500);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.registerUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  if (!user) {
    throw new MyError("Хэрэглэгч бүртгэх амжилтгүй боллоо", 500);
  }
  const jwt = user.getJWT();

  res.status(200).json({
    success: true,
    data: user,
    token: jwt,
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new MyError("Нэвтрэх нэр, нууц үг оруулна уу", 400);
  }

  let user;
  if (!isNaN(Number(userName))) {
    user = await User.findOne({ phone: userName }).select("+password");
  } else {
    user = await User.findOne({ email: userName.toLowerCase() }).select(
      "+password"
    );
  }
  if (!user) {
    throw new MyError("Нэвтрэх нэр, нууц үгээ шалгана уу", 401);
  }

  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new MyError("Нэвтрэх нэр, нууц үгээ шалгана уу", 401);
  }

  const token = user.getJWT();

  res.status(200).json({
    success: true,
    user,
    token,
  });
});

exports.uploadUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new MyError(req.params.id + " ID-тэй хэрэглэгч олдсонгүй.", 400);
  }

  // image upload
  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  file.name = `user_profile${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`./public/uploads/${file.name}`, async (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    user.profilePicture = `${file.name}`;
    await user.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
