const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  serviceType: {
    type: String,
    enum: ["Laundry", "Room Cleaning"],
    required: true
  },

  // Laundry fields
  clothesCount: {
    type: Number,
    default: 0
  },

  laundryType: {
    type: String,
    enum: ["Normal", "Express"],
    default: "Normal"
  },

  // Cleaning fields
  cleaningSlot: {
    type: String,
    default: ""
  },

  message: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Completed"],
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.models.ServiceRequest ||
  mongoose.model("ServiceRequest", serviceRequestSchema);
