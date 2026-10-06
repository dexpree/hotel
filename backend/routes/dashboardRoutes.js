const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const totalRooms = await Room.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const availableRooms = await Room.countDocuments({ status: "Available" });

  res.json({
    totalRooms,
    totalBookings,
    availableRooms
  });
});

module.exports = router;
