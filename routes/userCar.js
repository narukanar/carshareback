const express = require("express");
const {
  addUserCar,
  getUserCars,
  updateUserCar,
  getDrivers,
  getDriversName,
  uploadUserCarPicture,
  deleteUserCar,
} = require("../controller/userCar");

const router = express.Router();

router.route("/:id").delete(deleteUserCar);
router.route("/:userId").get(getUserCars);
router.route("/:userId").post(addUserCar);
router.route("/:id/carImage").post(uploadUserCarPicture);
router.route("/:userId").put(updateUserCar);
router.route("/drivers/car").get(getDrivers);
router.route("/drivers/:name").get(getDriversName);

module.exports = router;
