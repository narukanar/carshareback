const express = require("express");
const {
  addDriverRoute,
  getDriverRoute,
  updateDriverRoute,
  getAllDriverRoute,
  deleteDriverRoute,
  getInRouteDriverRoutes,
  getInRouteDriverRoutesOrderedCarType,
  getInRouteDriverRoutesOrderedDriverRank,
  getInRouteDriverRoutesOrderedPrice,
} = require("../controller/driverRoute");

const router = express.Router();

router.route("/").get(getAllDriverRoute);
router.route("/find/:coordinate").get(getInRouteDriverRoutes);
router
  .route("/find/:coordinate/carType/:carType")
  .get(getInRouteDriverRoutesOrderedCarType);
router
  .route("/find/:coordinate/price/:price")
  .get(getInRouteDriverRoutesOrderedPrice);
router
  .route("/find/:coordinate/driverRank/:driverRank")
  .get(getInRouteDriverRoutesOrderedDriverRank);
router.route("/:userId").get(getDriverRoute);
router.route("/:userId").post(addDriverRoute);
router.route("/:id").put(updateDriverRoute);
router.route("/:id").delete(deleteDriverRoute);

module.exports = router;
