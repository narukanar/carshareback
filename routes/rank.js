const express = require("express");
const { updateUserRank } = require("../controller/rank");

const router = express.Router();

router.route("/:userId").post(updateUserRank);

module.exports = router;
