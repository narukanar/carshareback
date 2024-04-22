const mongoose = require("mongoose");

const historyShema = new mongoose.Schema({
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
    driverId: {
        type: mongoose.Schema.ObjectId,
        ref: "driver",
      },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
});

module.exports = mongoose.model('History', historyShema);
