const express = require("express");
const {
  getAllCars,
  getSameCars,
  getFirmAllCars,
  createCar,
} = require("../controller/car");

const router = express.Router();

router.route("/:firmId").get(getFirmAllCars);
router.route("/:firmId/:markId").get(getSameCars);

router.route("/").get(getAllCars);
router.route("/").post(createCar);

module.exports = router;
