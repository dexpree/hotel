const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const auth = require("../middleware/authMiddleware");

/* =========================
   AUTO COMPLETE BOOKINGS
========================= */
const autoCompleteBookings = async () => {
  const now = new Date();

  const bookings = await Booking.find({
    status: "Approved",
    checkOut: { $lt: now }
  });

  for (let booking of bookings) {
    booking.status = "Completed";
    booking.notification = "Stay completed";

    await booking.save();

    const room = await Room.findById(booking.roomId);
    room.status = "Available";
    await room.save();
  }
};

/* =========================
   USER: CREATE BOOKING
========================= */
router.post("/", auth, async (req, res) => {
  await autoCompleteBookings();

  const { roomId, checkIn, checkOut } = req.body;

  const room = await Room.findById(roomId);
  if (!room || room.status !== "Available") {
    return res.status(400).json({ message: "Room not available" });
  }

  const booking = new Booking({
    userId: req.user.id,
    roomId,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    status: "Pending",
    notification: "Booking request sent"
  });

  await booking.save();

  room.status = "Not Available";
  await room.save();

  res.json({ message: "Booking request sent (Pending approval)" });
});

/* =========================
   USER: MY BOOKINGS
========================= */
router.get("/my", auth, async (req, res) => {
  await autoCompleteBookings();

  const bookings = await Booking.find({ userId: req.user.id })
    .populate("roomId", "roomNumber type price");

  res.json(bookings);
});

/* =========================
   ADMIN: ALL BOOKINGS
========================= */
router.get("/", auth, async (req, res) => {
  await autoCompleteBookings();

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const bookings = await Booking.find()
    .populate("userId", "name email")
    .populate("roomId", "roomNumber type price");

  res.json(bookings);
});

/* =========================
   ADMIN: APPROVE / REJECT
========================= */
router.put("/:id/status", auth, async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  booking.status = status;
  booking.notification =
    status === "Approved"
      ? "Booking approved"
      : "Booking rejected";

  await booking.save();

  if (status === "Rejected") {
    const room = await Room.findById(booking.roomId);
    room.status = "Available";
    await room.save();
  }

  res.json({ message: `Booking ${status}` });
});

/* =========================
   USER: CANCEL BOOKING
========================= */
router.put("/:id/cancel", auth, async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  booking.status = "Cancelled";
  booking.notification = "Booking cancelled by user";

  await booking.save();

  const room = await Room.findById(booking.roomId);
  room.status = "Available";
  await room.save();

  res.json({ message: "Booking cancelled" });
});

// ✅ USER PAY FOR BOOKING
router.put("/:id/pay", auth, async (req, res) => {
  try {
    const { method } = req.body; // UPI / CARD / CASH

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Only booking owner can pay
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Validate method
    const validMethods = ["UPI", "CARD", "CASH"];
    if (!validMethods.includes(method)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    booking.paymentStatus = "Paid";
    booking.paymentMethod = method;
    booking.transactionId = "TXN" + Date.now();
    booking.paidAt = new Date();

    await booking.save();

    res.json({
      message: `Payment successful via ${method}`,
      booking
    });

  } catch (err) {
    res.status(500).json({ message: "Payment failed" });
  }
});


module.exports = router;
