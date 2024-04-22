const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { first } = require("lodash");
const { kMaxLength } = require("buffer");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true,"Хэрэглэгчийн нэрийг оруулна уу"],
        maxLength: [50, "Хэрэглэгчийн нэрийн урт дээд тал нь 50 байна"],
    },
    lastName: {
        type:String,
        required: [true,"Хэрэглэгчийн овгийн оруулна уу"],
        maxLength: [50, "Хэрэглэгчийн овгийн урт дээд тал нь 50 байна"],
    },
    phone: {
      type: Number,
      // required: [true, "Утасны дугаар заавал оруулна уу"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Имэйл заавал оруулна уу"],
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      ],
      unique: true,
    },
    profilePicture: String,
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
    rankId: {
      type: mongoose.Schema.ObjectId,
      ref: "rank",
    },
    customerId: {
        type: mongoose.Schema.ObjectId,
        ref: "customer",
      },
      driverId: {
        type: mongoose.Schema.ObjectId,
        ref: "driver",
      },
    resetPasswordExpire: {
      type: Date,
      select: false,
    },
    fcmToken: {
      type: String,
    },

});
 // хадгалхын өмнө нууц үг шалгана
 UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) next();
    
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//token үүсгэнэ
UserSchema.methods.getJWT = function () {
    const jsonWebToken = jwt.sign({ id: this._id }, process.env.TOKEN_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE,
    });
  
    return jsonWebToken;
  };
  
  // нууц үг таарч байгааг шалгана 
  UserSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
//email ruu code ywuulah heseg 
  UserSchema.methods.generateResetPasswordToken = function () {
    // const resetToken = crypto.randomBytes(20).toString("hex");
  
    // this.resetPasswordToken = crypto
    //   .createHash("sha256")
    //   .update(resetToken)
    //   .digest("hex");
  
    // this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    // return resetToken;
  
    const resetCode = Math.floor(1000 + Math.random() * 9000);
  
    this.resetPasswordToken = resetCode;
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetCode;
  };
  
  module.exports = mongoose.model("User", UserSchema);