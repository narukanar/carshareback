const express = require("express");
const {
  getAllCarFirms,
  getCarFirms,
  createCarFirm,
} = require("../controller/carFirm");

const router = express.Router();

router.route("/").get(getAllCarFirms);
router.route("/").post(createCarFirm);
router.route("/:id").get(getCarFirms);

module.exports = router;
