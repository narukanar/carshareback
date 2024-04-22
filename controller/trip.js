const asyncHandler = require("../middleware/asyncHandler");
const Trip = require("../model/trip");
const User = require("../model/user");
const UserRoute = require("../model/userRoute");
const DriverRoute = require("../model/driverRoute");
const Notification = require("../model/notification");
const MyError = require("../utils/myError");
const { isEmpty } = require("lodash");
// const { sendNotification } = require("../utils/notification");

exports.getUserTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.find({ userRouteId: req.params.userRoute })
    .populate("userRouteId")
    .populate("driverId");

  if (!trip) {
    throw new MyError("Аялал олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: trip });
});

exports.getDriverTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.find({
    driverRouteId: req.params.driverRoute,
  })
    .populate("driverRouteId")
    .populate("userId");
  if (!trip) {
    throw new MyError("Аялал олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: trip });
});

exports.getDriverRouteTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.find({
    driverRouteId: req.params.driverRouteId,
  })
    .populate("userId")
    .populate("driverId");
  if (!trip) {
    throw new MyError("Аялал олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: trip });
});

exports.getAllTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.find();

  if (!trip) {
    throw new MyError("Аялал олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: trip });
});

exports.getTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id)
    .populate("driverRouteId")
    .populate("userRouteId");

  if (!trip) {
    throw new MyError("Аялал олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: trip });
});

exports.addTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.create(req.body);

  if (!trip) {
    throw new MyError("Аялал нэмэгдэхэд алдаа гарлаа", 500);
  }

  res.status(200).json({ success: true, data: trip });
});

exports.updateTrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!trip) {
    throw new MyError("Аялал шинэчлэхэд алдаа гарлаа", 402);
  }

  res.status(200).json({ success: true, data: trip });
});

exports.getDriverUsers = asyncHandler(async (req, res, next) => {
  const data = await Trip.find({
    driverId: req.params.driverId,
    driverRouteId: req.params.driverRouteId,
  }).populate("userId");

  if (!data) {
    throw new MyError("Тухайн хэрэглэгч дээр аялал байхгүй байна.");
  }

  res.status(200).json({ success: true, data });
});

exports.getUserDriverAndUsers = asyncHandler(async (req, res, next) => {
  const data = await Trip.find({
    userId: req.params.userId,
    userRouteId: req.params.userRouteId,
  })
    .populate("driverId")
    .populate("userId");

  if (!data) {
    throw new MyError("Тухайн хэрэглэгч дээр аялал байхгүй байна.");
  }

  res.status(200).json({ success: true, data });
});

//hereglech joloochiig songoh
exports.addUserTrip = asyncHandler(async (req, res, next) => {
  const before = await Trip.find(req.body);
  if (!isEmpty(before)) {
    throw new MyError(
      "Та энэ чиглэлд тухайн жолоочтой хамт явахаар болсон байна."
    );
  }
  const driverRoute = await DriverRoute.findById(req.body.driverRouteId);
  if (driverRoute.type == 0) {
    throw new MyError("Тухайн жолоочийн хүн дүүрсэн байна.");
  } else {
    const trip = await Trip.create(req.body);
    if (!trip) {
      throw new MyError("Аялал нэмэхэд алдаа гарлаа.");
    }

    driverRoute.availableCount = driverRoute.availableCount - 1;
    if (driverRoute.availableCount == 0) {
      driverRoute.type = 0;
    }
    await driverRoute.save();

    const notif = await Notification.create({
      passengerUserId: req.body.userId,
      driverId: req.body.driverId,
      driverRouteId: req.body.driverRouteId,
    });
    const driver = await User.findById(req.body.driverId);
    // const user = await User.findById(req.body.userId);
    // if (!isEmpty(user.fcmToken)) {
    //   sendNotification(
    //     driver.fcmToken,
    //     "Аялал бүртгэгдлээ",
    //     `Тантай ${driver.firstName} хэрэглэгч хамт явахаар боллоо`
    //   );
    // }
    if (!notif) {
      throw new MyError("Мэдэгдэл үүсгэхэд алдаа гарлаа.");
    }

    res.status(200).json({ success: true, data: trip });
  }
});

//jolooch hereglegchiig songoh
exports.addDriverTrip = asyncHandler(async (req, res, next) => {
  const before = await Trip.find(req.body);
  if (!isEmpty(before)) {
    throw new MyError("Та тухайн хэрэглэгчтэй хамт явахаар болсон байна.");
  }
  const userRoute = await UserRoute.findById(req.params.userRouteId);

  if (userRoute.type == 2) {
    throw new MyError("Тухайн жолооч хамт явах хүмүүсээ олсон байна.");
  } else {
    const trip = await Trip.create(req.body);
    if (!trip) {
      throw new MyError("Аялал нэмэхэд алдаа гарлаа.");
    }
    userRoute.type = 2;
    userRoute.save();

    const notif = await Notification.create({
      passengerUserId: req.body.userId,
      driverId: req.body.driverId,
      userRouteId: req.params.userRouteId,
    });
    const user = await User.findById(req.body.userId);
    const driver = await User.findById(req.body.driverId);

    // if (!isEmpty(user.fcmToken)) {
    //   sendNotification(
    //     user.fcmToken,
    //     "Аялал бүртгэгдлээ",
    //     `Тантай ${driver.firstName} жолооч хамт явахаар боллоо`
    //   );
    // }
    if (!notif) {
      throw new MyError("Мэдэгдэл үүсгэхэд алдаа гарлаа.");
    }
    res.status(200).json({ success: true, data: trip });
  }
});

exports.getUserTripWithoutUserRoute = asyncHandler(async (req, res, next) => {
  const trip = await Trip.find({ userId: req.params.userId })
    .populate("driverRouteId")
    .populate("driverId");

  if (!trip) {
    throw new MyError("Хэрэглэгч дээр аялал байхгүй байна.");
  }

  res.status(200).json({ success: true, data: trip });
});

exports.getDriverTripWithoutUserRoute = asyncHandler(async (req, res, next) => {
  const trip = await Trip.find({ driverId: req.params.driverId })
    .populate("userRouteId")
    .populate("userId");

  if (!trip) {
    throw new MyError("Хэрэглэгч дээр аялал байхгүй байна.");
  }

  res.status(200).json({ success: true, data: trip });
});

exports.deletetrip = asyncHandler(async (req, res, next) => {
  const trip = await Trip.findOneAndDelete(req.params.id);
  if (!trip) {
    throw new MyError("Aялал байхгүй байна.");
  }
  if (trip.userRouteId) {
    const userRoute = await UserRoute.findById(trip.userRouteId);
    userRoute.type = 1;
    await userRoute.save();
    const notification = await Notification.findOneAndDelete({
      userRouteId: trip.userRouteId,
    });
  } else if (trip.driverRouteId) {
    const driverRoute = await DriverRoute.findById(trip.driverRouteId);
    driverRoute.availableCount = driverRoute.availableCount + 1;
    await driverRoute.save();
    const notification = await Notification.findOneAndDelete({
      driverRouteId: trip.driverRouteId,
    });
  }

  res.status(200).json({ success: true, data: trip });
});
