const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/authMiddleware");

/* USER PROFILE */
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

/* UPDATE PROFILE */
router.put("/me", auth, async (req, res) => {
  const { name, email, password, phone, address, idType, idNumber } = req.body;
  const user = await User.findById(req.user.id);

  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (address) user.address = address;
  if (idType) user.idType = idType;
  if (idNumber) user.idNumber = idNumber;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();
  res.json({ message: "Profile updated" });
});

/* ADMIN – ONLY USERS (NO ADMINS) */
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
});

module.exports = router;
