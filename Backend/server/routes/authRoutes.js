const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  getMembers,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

router.get("/members", protect, getMembers);

module.exports = router;