const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomNumber: Number,
  type: String,
  price: Number,
  status: {
    type: String,
    default: "Available"
  },
  images: {
    type: [String],
    default: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
    ]
  }
});

module.exports = mongoose.model("Room", RoomSchema);
