const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const fileUpload = require("express-fileupload");
const path = require("path");

const connectDb = require("./config/connectDB");
const errorHandler = require("./middleware/errorHandler");

const userRoute = require("./routes/user");
const carRoute = require("./routes/car");
const carFirmRoute = require("./routes/carFirm");
const addressRoute = require("./routes/address");
const historyRoute = require("./routes/history");
const userRouteRoute = require("./routes/userRoute");
const driverRouteRoute = require("./routes/driverRoute");
const rankRoute = require("./routes/rank");
const userCarRoute = require("./routes/userCar");
const tripRoute = require("./routes/trip");
const notificationRoute = require("./routes/notification");
const requestRoute = require("./routes/request");
const admin = require("firebase-admin");

dotenv.config({ path: "./config/config.env" });

const app = express();

connectDb();

var whitelist = ["http://localhost:3000"];

// Өөр домэйн дээр байрлах клиент вэб аппуудаас шаардах шаардлагуудыг энд тодорхойлн
var corsOptions = {
  // Ямар ямар домэйнээс манай рест апиг дуудаж болохыг заана
  origin: function (origin, callback) {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      // Энэ домэйнээс манай рест рүү хандахыг зөвшөөрнө
      callback(null, true);
    } else {
      // Энэ домэйнд хандахыг хориглоно.
      callback(new Error("Horigloj baina.."));
    }
  },
  // Клиент талаас эдгээр http header-үүдийг бичиж илгээхийг зөвшөөрнө
  allowedHeaders: "Authorization, Set-Cookie, Content-Type",
  // Клиент талаас эдгээр мэссэжүүдийг илгээхийг зөвөөрнө
  methods: "GET, POST, PUT, DELETE",
  // Клиент тал authorization юмуу cookie мэдээллүүдээ илгээхийг зөвшөөрнө
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // limit each IP to 100 requests per windowMs
  message: "15 минутанд 500 удаа хандаж болно! ",
});

//хандалтын тоог хязгаарлах
app.use(limiter);

//http parameter pollution халдлагаас хамгаална
app.use(hpp());

app.use(cookieParser());

app.use(express.json());

app.use(fileUpload());

app.use(cors(corsOptions));

//http header дэх мэдээллийг засна
app.use(helmet());

// Cross site scripting халдлагаас хамгаална
app.use(xss());

// MongoDB дэх халдлагаас хамгаална
app.use(mongoSanitize());

app.use("/uploads", express.static(__dirname + "/public/uploads"));

app.use("/users", userRoute);
app.use("/cars", carRoute);
app.use("/carFirms", carFirmRoute);
app.use("/address", addressRoute);
app.use("/history", historyRoute);
app.use("/userRoute", userRouteRoute);
app.use("/driverRoute", driverRouteRoute);
app.use("/rank", rankRoute);
app.use("/userCar", userCarRoute);
app.use("/trip", tripRoute);
app.use("/notification", notificationRoute);
app.use("/request", requestRoute);
// app.use("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build", "index.html"));
// });

app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(`server ${process.env.PORT} амжилттай ажиллаа`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`);
  // server.close(() => {
  //   process.exit(1);
  // });
});
