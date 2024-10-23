const express = require("express");
const {
  handleRegisterUser,
  handleLoginUser,
  handleForgetPassword,
  handleResetPassword,
} = require("../../controller/users/index");

const router = express.Router();

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
router.post("/forget-password", handleForgetPassword);
router.post("/reset-password/:id/:token", handleResetPassword);

module.exports = router;
