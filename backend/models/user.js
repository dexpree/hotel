const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },

  phone: String,
  address: String,
  idType: {
    type: String,
    enum: ["Aadhaar", "Passport", "Driving License"]
  },
  idNumber: String
});

// 🔴 IMPORTANT: prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
