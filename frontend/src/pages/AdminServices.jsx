import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";

function AdminServices() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const fetchServices = () => {
    API.get("/services").then((res) => setServices(res.data));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/services/${id}/status`, { status });
    fetchServices();
  };

  return (
     <>
    <Navbar />
    <div className="container">
      <div className="top-actions">
        {/* <button onClick={() => navigate("/dashboard")}>⬅</button>
        <Logout /> */}
      </div>

      <h2>🛎️ Service Requests (Admin)</h2>

      {services.length === 0 && <p>No service requests found.</p>}

      {services.map((s) => (
        <div className="card" key={s._id}>
          <p><b>User:</b> {s.userId?.name} ({s.userId?.email})</p>
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

          {s.message && <p><b>Message:</b> {s.message}</p>}

          <p><b>Status:</b> {s.status}</p>
          <p><b>Date:</b> {new Date(s.createdAt).toLocaleString()}</p>

          <select
            value={s.status}
            onChange={(e) => updateStatus(s._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      ))}
    </div>
      </>
  );
}

export default AdminServices;
