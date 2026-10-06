const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");
const auth = require("../middleware/authMiddleware");

/* =========================
   USER: SEND FEEDBACK
========================= */
router.post("/", auth, async (req, res) => {
  const { message, rating } = req.body;

  const feedback = new Feedback({
    userId: req.user.id,
    message,
    rating
  });

  await feedback.save();
  res.json({ message: "Feedback submitted successfully" });
});

/* =========================
   ADMIN: VIEW FEEDBACK
========================= */
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  const feedbacks = await Feedback.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  res.json(feedbacks);
});

module.exports = router;
