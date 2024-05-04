const asyncHandler = require("../middleware/asyncHandler");
const DriverRoute = require("../model/driverRoute");
const UserRoute = require("../model/userRoute");
const Notification = require("../model/notification");
const MyError = require("../utils/myError");
const { isEmpty } = require("lodash");
const { decode } = require("@mapbox/polyline");
const { isPositionIncludedInRoute } = require("../utils/location");

exports.getAllDriverRoute = asyncHandler(async (req, res, next) => {
  const date = new Date(Date.now() - 60 * 60 * 1000);
  const route = await DriverRoute.find({ date: { $gte: date } })
    .populate("userId")
    .populate("car");

  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: route });
});

exports.getInRouteDriverRoutes = asyncHandler(async (req, res, next) => {
  const date = new Date(Date.now() - 60 * 60 * 1000);
  const route = await DriverRoute.find({ date: { $gte: date } })
    .populate("userId")
    .populate("car");
  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл олдсонгүй", 500);
  }
  let routeArr = [];
  if (req.params.coordinate) {
    const positionArr = req.params.coordinate.split(",");
    const position = {
      latitude: parseFloat(positionArr[0]),
      longitude: parseFloat(positionArr[1]),
    };
    route.forEach((route) => {
      if (route.routePolyline) {
        const decodedPoints = decode(route.routePolyline);
        const coordinates = decodedPoints.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

        const isIncluded = isPositionIncludedInRoute(
          coordinates,
          position,
          0.2
        );

        if (isIncluded) {
          routeArr.push(route);
        }
      }
    });
  }

  res.status(200).json({ success: true, data: routeArr });
});

exports.getInRouteDriverRoutesOrderedCarType = asyncHandler(
  async (req, res, next) => {
    const date = new Date(Date.now() - 60 * 60 * 1000);
    const route = await DriverRoute.find({ date: { $gte: date } })
      .populate("userId")
      .populate("car");
    if (!route) {
      throw new MyError("Хэрэглэгчийн чиглэл олдсонгүй", 500);
    }
    let routeArr = [];
    if (req.params.coordinate) {
      const positionArr = req.params.coordinate.split(",");
      const position = {
        latitude: parseFloat(positionArr[0]),
        longitude: parseFloat(positionArr[1]),
      };
      route.forEach((route) => {
        if (route.routePolyline) {
          const decodedPoints = decode(route.routePolyline);
          const coordinates = decodedPoints.map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }));

          const isIncluded = isPositionIncludedInRoute(
            coordinates,
            position,
            0.2
          );

          if (isIncluded) {
            routeArr.push(route);
          }
        }
      });
    }

    res.status(200).json({ success: true, data: routeArr });
  }
);

exports.getInRouteDriverRoutesOrderedPrice = asyncHandler(
  async (req, res, next) => {
    const date = new Date(Date.now() - 60 * 60 * 1000);
    const route = await DriverRoute.find({
      date: { $gte: date },
      price: { $lte: Number(req.params.price) },
    })
      .populate("userId")
      .populate("car");
    if (!route) {
      throw new MyError("Хэрэглэгчийн чиглэл олдсонгүй", 500);
    }
    let routeArr = [];
    if (req.params.coordinate) {
      const positionArr = req.params.coordinate.split(",");
      const position = {
        latitude: parseFloat(positionArr[0]),
        longitude: parseFloat(positionArr[1]),
      };
      route.forEach((route) => {
        if (route.routePolyline) {
          const decodedPoints = decode(route.routePolyline);
          const coordinates = decodedPoints.map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }));

          const isIncluded = isPositionIncludedInRoute(
            coordinates,
            position,
            0.2
          );

          if (isIncluded) {
            routeArr.push(route);
          }
        }
      });
    }

    res.status(200).json({ success: true, data: routeArr });
  }
);

exports.getInRouteDriverRoutesOrderedDriverRank = asyncHandler(
  async (req, res, next) => {
    const date = new Date(Date.now() - 60 * 60 * 1000);
    const route = await DriverRoute.find({
      date: { $gte: date },
      rating: req.params.driverRank,
    })

      .populate("userId")
      .populate("car");
    if (!route) {
      throw new MyError("Хэрэглэгчийн чиглэл олдсонгүй", 500);
    }
    let routeArr = [];
    if (req.params.coordinate) {
      const positionArr = req.params.coordinate.split(",");
      const position = {
        latitude: parseFloat(positionArr[0]),
        longitude: parseFloat(positionArr[1]),
      };
      route.forEach((route) => {
        if (route.routePolyline) {
          const decodedPoints = decode(route.routePolyline);
          const coordinates = decodedPoints.map((point) => ({
            latitude: point[0],
            longitude: point[1],
          }));

          const isIncluded = isPositionIncludedInRoute(
            coordinates,
            position,
            0.2
          );

          if (isIncluded) {
            routeArr.push(route);
          }
        }
      });
    }

    res.status(200).json({ success: true, data: routeArr });
  }
);

exports.getDriverRoute = asyncHandler(async (req, res, next) => {
  const date = new Date();
  const route = await DriverRoute.find({
    userId: req.params.userId,
    date: { $gte: date },
  })
    .populate("userId")
    .populate("car");

  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл олдсонгүй", 500);
  }

  res.status(200).json({ success: true, data: route });
});

exports.addDriverRoute = asyncHandler(async (req, res, next) => {
  const route = await DriverRoute.create(req.body);

  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл нэмэгдэхэд алдаа гарлаа", 500);
  }
  const date = Date.now();
  const userRoute = await UserRoute.find();

  let userRouteArr = [];
  if (userRoute) {
    userRoute.forEach((el) => {
      const positionArr = el.fromLocationCoords.split(",");
      const position = {
        latitude: parseFloat(positionArr[0]),
        longitude: parseFloat(positionArr[1]),
      };
      console.log("position", position);
      if (req.body.routePolyline) {
        const decodedPoints = decode(req.body.routePolyline);
        const coordinates = decodedPoints.map((point) => ({
          latitude: point[0],
          longitude: point[1],
        }));

        const isIncluded = isPositionIncludedInRoute(
          coordinates,
          position,
          0.2
        );

        if (isIncluded) {
          userRouteArr.push(el);
        }
      }
    });

    for (let i = 0; i < userRouteArr.length; i++) {
      const item = userRouteArr[i];
      const notificationParam = {
        passengerUserId: item.userId,
        driverId: req.body.userId,
        driverRouteId: route._id,
        status: 3,
      };
      await Notification.create(notificationParam);
    }
  }

  res.status(200).json({ success: true, data: route });
});

exports.updateDriverRoute = asyncHandler(async (req, res, next) => {
  const route = await DriverRoute.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл алдаа гарлаа", 500);
  }

  res.status(200).json({ success: true, data: route });
});
exports.deleteDriverRoute = asyncHandler(async (req, res, next) => {
  const route = await DriverRoute.findByIdAndDelete(req.params.id);

  if (!route) {
    throw new MyError("Хэрэглэгчийн чиглэл алдаа гарлаа", 500);
  }

  res.status(200).json({ success: true, data: route });
});
