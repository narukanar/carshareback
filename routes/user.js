const express = require("express");
const {
  registerUser,
  loginUser,
  uploadUserProfile,
  updateUser,
  getUser,
  forgotPassword,
  newPassword,
  resetPassword,
  rateUser,
} = require("../controller/user");

const router = express.Router();

router.route("/:id").put(updateUser);
router.route("/:id").get(getUser);
router.route("/rating/:id").post(rateUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/userProfileImage/:id").post(uploadUserProfile);

router.route("/forgot-password").post(forgotPassword);
router.route("/check-token").post(resetPassword);
router.route("/reset-password").post(newPassword);

module.exports = router;
