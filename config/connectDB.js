const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
    console.log(`mongodb holbogdloo: ${conn.connection.host}`);
  } catch (error) {}
};

module.exports = connectDb;
