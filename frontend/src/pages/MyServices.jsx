import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";

import "../styles/common.css";

function MyServices() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/services/my").then((res) => setServices(res.data));
  }, []);

  return (
    <>
    <Navbar />
    <div className="container">
      {/* <button onClick={() => navigate("/rooms")}>⬅</button>
      <Logout /> */}

      <h2>📌 My Service Requests</h2>

      {services.length === 0 && <p>No service requests yet.</p>}

      {services.map((s) => (
        <div className="card" key={s._id}>
          <p><b>Service:</b> {s.serviceType}</p>

          {s.serviceType === "Laundry" && (
            <>
              <p><b>Clothes Count:</b> {s.clothesCount}</p>
              <p><b>Laundry Type:</b> {s.laundryType}</p>
            </>
          )}

          {s.serviceType === "Room Cleaning" && (
            <p><b>Cleaning Slot:</b> {s.cleaningSlot}</p>
          )}

          <p><b>Status:</b> {s.status}</p>

          {s.message && <p><b>Message:</b> {s.message}</p>}

          <p><b>Date:</b> {new Date(s.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
    </>
  );
}

export default MyServices;
