const User = require("../../model/users/index.js");
const Post = require("../../model/posts/index.js");

const handleGetAdmin = async (req, res) => {
  try {
    const adminId = req.params.id;
    const getAdmin = await User.findById(adminId);
    res.json(getAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "User" });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: "User" });
    res.json({ count: userCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetPostCount = async (req, res) => {
  try {
    const postCount = await Post.countDocuments();
    res.json({ count: postCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleGetAdminCount = async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: "Admin" });
    res.json({ count: adminCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await Post.deleteMany({ author: userId });

    res.json({ message: "User and associated posts deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleDeletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const deletedPost = await Post.findByIdAndDelete(postId);
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleGetAdmin,
  handleGetAllUsers,
  handleGetAllPosts,
  handleGetUserCount,
  handleGetPostCount,
  handleGetAdminCount,
  handleDeleteUser,
  handleDeletePost,
};
