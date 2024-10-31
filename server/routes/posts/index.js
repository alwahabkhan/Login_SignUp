const express = require("express");
const router = express.Router();
const {
  handleCreatePost,
  handleGetPost,
  upload,
  handleViewPost,
} = require("../../controller/posts/index");
const authenticateToken = require("../../middleware/authMiddleware");

router.post(
  "/createposts",
  authenticateToken,
  upload.single("file"),
  handleCreatePost
);

router.get("/getposts/:author", authenticateToken, handleGetPost);

router.get("/viewposts/:id", authenticateToken, handleViewPost);

module.exports = router;
