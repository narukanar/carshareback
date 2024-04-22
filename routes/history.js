const express = require("express");
const {
  addUserHistory,
  getUserHistory,
  updateUserHistory,
  getUserHistoryCount,
} = require("../controller/history");

const router = express.Router();

router.route("/:userId").get(getUserHistory);
router.route("/:userId/count").get(getUserHistoryCount);
router.route("/:userId").post(addUserHistory);
router.route("/:id").put(updateUserHistory);

module.exports = router;
