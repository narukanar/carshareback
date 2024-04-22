const mongoose = require("mongoose");

const userRouteShema = new mongoose.Schema({
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
    toLocationName: {
        type: String,
        required: [true, "Очих цэгийн нэрийг оруулна уу!"],
        trim: true,
    },
    date: {
        type: Date,
        required: [true, "Огноо оруулна уу!"],
    },
    type: {
        type: String, // 1- bolomjtoi, 0 - hamt yavah hunee olson,
        default: 1,
      },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
});

module.exports = mongoose.model('UserRoute', userRouteShema);
