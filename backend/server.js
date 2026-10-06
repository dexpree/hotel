const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

require("dotenv").config();

const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/analytics", analyticsRoutes);
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use("/uploads", express.static("uploads"));

/* AUTO CREATE ADMIN FUNCTION */

async function createAdmin() {

  try {

    const adminEmail = "admin@gmail.com";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();

    console.log("Default admin account created");

  } catch (err) {
    console.log("Admin creation error:", err);
  }

}

/* CONNECT DATABASE */

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    console.log("MongoDB connected");

    await createAdmin(); // create admin automatically

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  })
  .catch(err => console.log(err));

module.exports = app;
