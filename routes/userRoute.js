const express = require("express");
const router = express.Router();
const {
  getAllDriverRoute,
  addUserRoute,
  getSameRouteUsers,
  getUserRoute,
  updateUserRoute,
  deleteUserRoute,
} = require("../controller/userRoute");

router.route("/").get(getAllDriverRoute);
router.route("/:userId").post(addUserRoute);
router.route("/:userId/:location").get(getSameRouteUsers);
router.route("/:userId").get(getUserRoute);
router.route("/:id").put(updateUserRoute);
router.route("/:id").delete(deleteUserRoute);

module.exports = router;
