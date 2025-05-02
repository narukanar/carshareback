const express = require("express");
const {
  addNotification,
  deleteNotification,
  getUserAllNotification,
  getUserAcceptedHistory,
} = require("../controller/notification");

const router = express.Router();

router.route("/:userId").get(getUserAllNotification);
router.route("/accepted/:userId").get(getUserAcceptedHistory);
router.route("/").post(addNotification);
router.route("/:id").delete(deleteNotification);

module.exports = router;
