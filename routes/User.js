const express = require("express");

//const User = require("../models/userModel");
const {
  createUser,
  loginUser,
  refreshToken,
  getAllUser,
  getaUser,
  logoutUser,
  updatedUser,
  deleteUser,
  blockUser,
  unblockUser,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
} = require("../controller/userController");
const { fetchUser } = require("../middleware/authMiddleWare");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forget-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", fetchUser, updatePassword);
router.get("/getalluser", getAllUser);
router.get("/refreshtoken", refreshToken);
router.get("/logoutuser", logoutUser);
router.get("/:id", fetchUser, getaUser);
router.put("/:id", updatedUser);
router.delete("/:id", deleteUser);
router.put("/block-user/:id", fetchUser, blockUser);
router.put("/unblock-user/:id", fetchUser, unblockUser);

module.exports = router;
