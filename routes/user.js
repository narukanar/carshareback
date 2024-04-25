const express = require("express");
const {
  registerUser,
  loginUser,
  uploadUserProfile,
  updateUser,
  getUser,
} = require("../controller/user");

const router = express.Router();

router.route("/:id").put(updateUser);
router.route("/:id").get(getUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/userProfileImage/:id").post(uploadUserProfile);

module.exports = router;
