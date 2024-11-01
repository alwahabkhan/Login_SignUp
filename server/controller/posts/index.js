const Post = require("../../model/posts/index.js");
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

const handleCreatePost = async (req, res) => {
  try {
    const authorId = req.body.author;
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      date: new Date(),
      file: req.file ? req.file.filename : null,
      author: authorId,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: error.message });
  }
};

const handleGetPost = async (req, res) => {
  try {
    const authorId = req.params.author;
    const posts = await Post.find({ author: authorId });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleViewPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const viewposts = await Post.findById(postId);
    res.json(viewposts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleDeletePost = async (req, res) => {
  try {
    const deletepost = await Post.findByIdAndDelete(req.params.id);
    res.json(deletepost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleCreatePost,
  upload,
  handleGetPost,
  handleViewPost,
  handleDeletePost,
};
