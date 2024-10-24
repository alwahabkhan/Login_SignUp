const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  file: {
    type: String,
    require: true,
  },
});

const post = mongoose.model("posts", PostSchema);

module.exports = post;
