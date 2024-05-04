const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema({
  type: String, // 1,2,3,4,5
  name: String, //
  image: String,
});

module.exports = mongoose.model("rank", RankSchema);
