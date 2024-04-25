const express = require("express");
const {
  addDriverRoute,
  getDriverRoute,
  updateDriverRoute,
  getAllDriverRoute,
  deleteDriverRoute,
  getInRouteDriverRoutes,
} = require("../controller/driverRoute");

const router = express.Router();

router.route("/").get(getAllDriverRoute);
router.route("/find/:coordinate").get(getInRouteDriverRoutes);
router.route("/:userId").get(getDriverRoute);
router.route("/:userId").post(addDriverRoute);
router.route("/:id").put(updateDriverRoute);
router.route("/:id").delete(deleteDriverRoute);

module.exports = router;
