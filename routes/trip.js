const express = require("express");
const {
  addTrip,
  getAllTrip,
  getTrip,
  updateTrip,
  getDriverUsers,
  getUserDriverAndUsers,
  addDriverTrip,
  addUserTrip,
  getUserTrip,
  getDriverTrip,
  getDriverRouteTrip,
  getUserTripWithoutUserRoute,
  getDriverTripWithoutUserRoute,
  deletetrip,
} = require("../controller/trip");

const router = express.Router();

router.route("/").get(getAllTrip);
router.route("/:id").get(getTrip);
router.route("/:id").delete(deletetrip);
router.route("/:id").put(updateTrip);

router.route("/userTrip/:driverRouteId").post(addUserTrip);
router.route("/userTrip/:userRoute").get(getUserTrip);
router.route("/userTripWithoutRoute/:userId").get(getUserTripWithoutUserRoute);

router
  .route("/driverTripWithoutRoute/:driverId")
  .get(getDriverTripWithoutUserRoute);
router.route("/driverTrip/:driverRoute").get(getDriverTrip);
router.route("/driverTrip/:userRouteId").post(addDriverTrip);

router.route("/driverRouteTrip/:driverRouteId").get(getDriverRouteTrip);

router.route("/driverUsers/:driverId/:driverRouteId").get(getDriverUsers);
router
  .route("/userDriverUsers/:userId/:userRouteId")
  .get(getUserDriverAndUsers);

module.exports = router;
