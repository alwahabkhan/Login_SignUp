const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    require: true,
  },
});

const token = mongoose.model("token", tokenSchema);

module.exports = token;
