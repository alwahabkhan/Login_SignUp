const Post = require("../../model/posts/index.js");
const User = require("../../model/users/index.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const handlePost = async (req, res) => {
  const { title, description, author, date } = req.body;

  try {
    const result = await Post.create({
      title: title,
      description: description,
      author: author,
      date: date,
      file: req.file.filename,
    });

    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  handlePost,
  upload,
  handleGetPost,
};
