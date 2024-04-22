const express = require("express");
const {
  addNotification,
  deleteNotification,
  getUserAllNotification,
} = require("../controller/notification");

const router = express.Router();

router.route("/:userId").get(getUserAllNotification);
router.route("/").post(addNotification);
router.route("/:id").delete(deleteNotification);

module.exports = router;
