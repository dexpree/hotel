const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const auth = require("../middleware/authMiddleware");

// USER CREATE TICKET
router.post("/", auth, async (req, res) => {
  try {
    const { title, message, priority } = req.body;

    const ticket = new Ticket({
      userId: req.user.id,
      title,
      message,
      priority
    });

    await ticket.save();
    res.json({ message: "Complaint submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit complaint" });
  }
});

// USER VIEW MY TICKETS
router.get("/my", auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id }).sort({
      createdAt: -1
    });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

// ADMIN VIEW ALL TICKETS
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const tickets = await Ticket.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

// ADMIN UPDATE STATUS
router.put("/:id/status", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);
    ticket.status = status;

    await ticket.save();

    res.json({ message: "Ticket status updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update ticket" });
  }
});

module.exports = router;
