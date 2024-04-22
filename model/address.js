const mongoose = require("mongoose");

const addressShema = new mongoose.Schema({
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
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
});

module.exports = mongoose.model('Address', addressShema);
