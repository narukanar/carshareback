const express = require("express");
const {
  getDriverRequests,
  updateDriverRequests,
  createDriverRequests,
} = require("../controller/request");

const router = express.Router();

router.route("/:driverId").get(getDriverRequests);
router.route("/:driverId").post(createDriverRequests);
router.route("/:id").put(updateDriverRequests);

module.exports = router;
