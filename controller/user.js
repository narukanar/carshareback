const mongoose = require("mongoose");
const User = require("../model/user");
const asyncHandler = require("../middleware/asyncHandler");
const MyError = require("../utils/myError.js");


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