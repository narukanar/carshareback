const mongoose = require("mongoose");

const RankSchema = new mongoose.Schema({
  type: String,
  name: String,
  image: String,
});

module.exports = mongoose.model("rank", RankSchema);
