const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");


/* CREATE ROOM */

router.post("/", auth, admin, upload.array("images", 5), async (req, res) => {

  try {

    const { roomNumber, type, price } = req.body;

    const imagePaths = req.files
      ? req.files.map(file => "/uploads/" + file.filename)
      : [];

    const room = new Room({
      roomNumber,
      type,
      price,
      status: "Available",
      images: imagePaths
    });

    await room.save();

    res.json(room);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});


/* GET ALL ROOMS */

router.get("/", async (req, res) => {

  const rooms = await Room.find();

  res.json(rooms);

});


/* UPDATE ROOM */

router.put("/:id", auth, admin, upload.array("images", 5), async (req, res) => {

  try {

    const { type, price, status } = req.body;

    const updateData = { type, price, status };

    // if new images uploaded
    if (req.files && req.files.length > 0) {

      updateData.images = req.files.map(
        file => "/uploads/" + file.filename
      );

    }

    const room = await Room.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(room);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});


/* DELETE ROOM */

router.delete("/:id", auth, admin, async (req, res) => {

  try {

    const room = await Room.findById(req.params.id);

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    await room.deleteOne();

    res.json({ message: "Room deleted successfully" });

  } catch (err) {

    res.status(500).json({ message: "Failed to delete room" });

  }

});


module.exports = router;
