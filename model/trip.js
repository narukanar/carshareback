const { toInteger } = require("lodash");
const mongoose = require("mongoose");

const tripShema = new mongoose.Schema({
    fromLocationCoords: {
        type: String,
        required: [true, "Эхлэх цэгийг оруулна уу!"],
    },
    fromLocationName: {
        type: String,
        required: [true, "Эхлэх цэгийн нэрийг оруулна уу!"],
        trim: true,
    },
    toLocationCoords: {
        type: String,
        required: [true, "Очих цэгийг оруулна уу!"],
    },
    fromLocationName: {
        type: String,
        required: [true, "Очих цэгийн нэрийг оруулна уу!"],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, "Огноо оруулна уу!"],
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      driverId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      userRouteId: {
        type: mongoose.Schema.ObjectId,
        ref: "userRoute",
      },
      driverRouteId: {
        type: mongoose.Schema.ObjectId,
        ref: "driverRoute",
      },
});

module.exports = mongoose.model('trip', tripShema);
