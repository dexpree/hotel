const express = require("express");
const router = express.Router();

const ServiceRequest = require("../models/ServiceRequest");
const auth = require("../middleware/authMiddleware");

// ✅ USER CREATE SERVICE REQUEST
router.post("/", auth, async (req, res) => {
  try {
    const {
      serviceType,
      clothesCount,
      laundryType,
      cleaningSlot,
      message
    } = req.body;

    if (!serviceType) {
      return res.status(400).json({ message: "Service type is required" });
    }

    // Validation
    if (serviceType === "Laundry" && (!clothesCount || clothesCount <= 0)) {
          return res.status(400).json({ message: "Enter clothes count" });
    }

    if (serviceType === "Room Cleaning" && !cleaningSlot) {
          return res.status(400).json({ message: "Select a cleaning time slot" });
    }

    const newRequest = new ServiceRequest({
      userId: req.user.id,
      serviceType,
      clothesCount: clothesCount || 0,
      laundryType: laundryType || "Normal",
      cleaningSlot: cleaningSlot || "",
      message: message || ""
    });

    await newRequest.save();

    res.json({ message: "Service request submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit service request" });
  }
});

// ✅ USER VIEW MY SERVICES
router.get("/my", auth, async (req, res) => {
  try {
    const services = await ServiceRequest.find({ userId: req.user.id }).sort({
      createdAt: -1
    });

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

// ✅ ADMIN VIEW ALL SERVICES
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const services = await ServiceRequest.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

// ✅ ADMIN UPDATE STATUS
router.put("/:id/status", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    const service = await ServiceRequest.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service request not found" });
    }

    service.status = status;
    await service.save();

    res.json({ message: "Service status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update service status" });
  }
});

module.exports = router;
