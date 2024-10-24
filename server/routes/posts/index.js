const express = require("express");
const router = express.Router();
const {
  handlePost,
  handleGetPost,
  upload,
} = require("../../controller/posts/index");
const authenticateToken = require("../../middleware/authMiddleware");

router.post("/posts", authenticateToken, upload.single("file"), handlePost);
router.get("/get-post", handleGetPost);

module.exports = router;
