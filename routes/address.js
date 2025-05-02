const express = require("express");
const {
  addUserHomeAddress,
  updateUserHomeAddress,
  getUserHomeAddress,
  getUserAddress,
  addUserWorkAddress,
  getUserWorkAddress,
  updateUserWorkAddress,
} = require("../controller/address");

const router = express.Router();

router.route("/:userId").get(getUserAddress);
router.route("/:userId/homeAddress").get(getUserHomeAddress);
router.route("/:userId/homeAddress").put(updateUserHomeAddress);
router.route("/:userId/homeAddress").post(addUserHomeAddress);
router.route("/:userId/workAddress").get(getUserWorkAddress);
router.route("/:userId/workAddress").put(updateUserWorkAddress);
router.route("/:userId/workAddress").post(addUserWorkAddress);

module.exports = router;
