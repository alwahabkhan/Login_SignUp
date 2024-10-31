const express = require("express");
const {
  handleGetAdmin,
  handleGetAllUsers,
  handleGetAllPosts,
  handleGetUserCount,
  handleGetPostCount,
  handleGetAdminCount,
  handleDeleteUser,
  handleDeletePost,
} = require("../../controller/admins/index");
const authenticateToken = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/getadmin/:id", authenticateToken, handleGetAdmin);
router.get("/getallusers", authenticateToken, handleGetAllUsers);
router.get("/getallposts", authenticateToken, handleGetAllPosts);
router.get("/getcountusers", authenticateToken, handleGetUserCount);
router.get("/getcountposts", authenticateToken, handleGetPostCount);
router.get("/getcountadmins", authenticateToken, handleGetAdminCount);
router.delete("/deleteuser/:id", authenticateToken, handleDeleteUser);
router.delete("/deletepost/:id", authenticateToken, handleDeletePost);

module.exports = router;
