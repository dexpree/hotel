import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";

function AdminTickets() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const fetchTickets = () => {
    API.get("/tickets").then((res) => setTickets(res.data));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/tickets/${id}/status`, { status });
    fetchTickets();
  };

  return (
     <>
    <Navbar />
    <div className="container">
      <div className="top-actions">
        {/* <button onClick={() => navigate("/dashboard")}>⬅</button>
        <Logout /> */}
      </div>

      <h2>🛠 Complaint Management</h2>

      {tickets.length === 0 && <p>No complaints found.</p>}

      {tickets.map((t) => (
        <div className="card" key={t._id}>
          <p><b>User:</b> {t.userId?.name} ({t.userId?.email})</p>
          <p><b>Title:</b> {t.title}</p>
          <p><b>Message:</b> {t.message}</p>
          <p><b>Priority:</b> {t.priority}</p>

          <p>
            <b>Status:</b>{" "}
            <span style={{
              color:
                t.status === "Resolved"
                  ? "green"
                  : t.status === "In Progress"
                  ? "orange"
                  : "red"
            }}>
              {t.status}
            </span>
          </p>

          <p><b>Date:</b> {new Date(t.createdAt).toLocaleString()}</p>

          <select
            value={t.status}
            onChange={(e) => updateStatus(t._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      ))}
    </div>
      </>
  );
}

export default AdminTickets;
