import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";

function Services() {
  const [serviceType, setServiceType] = useState("Laundry");

  const [clothesCount, setClothesCount] = useState("");
  const [laundryType, setLaundryType] = useState("Normal");

  const [cleaningSlot, setCleaningSlot] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const submitService = async (e) => {
    e.preventDefault();

    try {
      await API.post("/services", {
        serviceType,
        clothesCount,
        laundryType,
        cleaningSlot,
        message
      });

      alert("Service request sent successfully!");
      navigate("/my-services");
    } catch (err) {
      alert(err.response?.data?.message || "Service request failed");
    }
  };

  return (
     <>
    <Navbar />
    <div className="container">
      {/* <button onClick={() => navigate("/rooms")}>⬅</button>
      <Logout /> */}

      <h2>🛎️ Hotel Services</h2>

      <form onSubmit={submitService}>
        <label>Service Type</label>
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="Laundry">🧺 Laundry Service</option>
          <option value="Room Cleaning">🧹 Room Cleaning</option>
        </select>

        {/* Laundry Inputs */}
        {serviceType === "Laundry" && (
          <>
            <label>Clothes Count</label>
            <input
              type="number"
              value={clothesCount}
              onChange={(e) => setClothesCount(e.target.value)}
              placeholder="Enter number of clothes"
              required
            />

            <label>Laundry Type</label>
            <select
              value={laundryType}
              onChange={(e) => setLaundryType(e.target.value)}
            >
              <option value="Normal">Normal</option>
              <option value="Express">Express</option>
            </select>
          </>
        )}

        {/* Cleaning Inputs */}
        {serviceType === "Room Cleaning" && (
          <>
            <label>Cleaning Time Slot</label>
            <select
              value={cleaningSlot}
              onChange={(e) => setCleaningSlot(e.target.value)}
              required
            >
              <option value="">Select Slot</option>
              <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
              <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
              <option value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</option>
            </select>
          </>
        )}

        <label>Extra Message (Optional)</label>
        <textarea
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write any additional info..."
        />

        <button type="submit">Submit Request</button>
      </form>

      <button style={{ marginTop: "10px" }} onClick={() => navigate("/my-services")}>
        📌 My Service Requests
      </button>
    </div>
      </>
  );
}

export default Services;
