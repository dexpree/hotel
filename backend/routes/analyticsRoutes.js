const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Room = require("../models/Room");
const Booking = require("../models/Booking");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// GET ADMIN ANALYTICS
router.get("/", auth, admin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });

    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ status: "Available" });
    const notAvailableRooms = await Room.countDocuments({ status: "Not Available" });

    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: "Pending" });
    const approvedBookings = await Booking.countDocuments({ status: "Approved" });
    const rejectedBookings = await Booking.countDocuments({ status: "Rejected" });
    const cancelledBookings = await Booking.countDocuments({ status: "Cancelled" });
    const completedBookings = await Booking.countDocuments({ status: "Completed" });

    // Revenue Calculation
    const revenueBookings = await Booking.find({
      status: { $in: ["Approved", "Completed"] }
    }).populate("roomId");

    let totalRevenue = 0;

    revenueBookings.forEach((booking) => {
      if (booking.roomId && booking.roomId.price) {
        totalRevenue += Number(booking.roomId.price);
      }
    });

    res.json({
      totalUsers,
      totalRooms,
      availableRooms,
      notAvailableRooms,
      totalBookings,
      pendingBookings,
      approvedBookings,
      rejectedBookings,
      cancelledBookings,
      completedBookings,
      totalRevenue
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

module.exports = router;
