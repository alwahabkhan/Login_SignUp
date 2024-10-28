const express = require("express");
const router = express.Router();
const {
  handleCreatePost,
  handleGetPost,
  upload,
} = require("../../controller/posts/index");
const authenticateToken = require("../../middleware/authMiddleware");

router.post(
  "/createposts",
  authenticateToken,
  upload.single("file"),
  handleCreatePost
);

router.get("/getposts/:author", authenticateToken, handleGetPost);

module.exports = router;
