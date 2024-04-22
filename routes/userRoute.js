const express = require("express");
const router = express.Router();
const{
    getAllDriverRoute,
    addUserRoute,
    getSameRouteUsers,
    getUserRoute,
    updateUserRoute,
    deleteUserRoute,
} = require("../controller/userRoute");

router.route("/").post(getAllDriverRoute);
router.route("/:userId").post(addUserRoute);
router.route("/:userId/:location").get(getSameRouteUsers);
router.route("/:userId").get(getUserRoute);
router.route("/:userId").put(updateUserRoute);
router.route("/id").delete(deleteUserRoute);

module.exports = router;