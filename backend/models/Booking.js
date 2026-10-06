const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },

  // ⏰ Date & Time
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Cancelled", "Completed"],
    default: "Pending"
  },
 paymentStatus: {
  type: String,
  default: "Pending"
},
paymentMethod: {
  type: String,
  enum: ["UPI", "CARD", "CASH"],
},

transactionId: {
  type: String,
  default: ""
},

paidAt: {
  type: Date
},


  notification: String
});

module.exports =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
