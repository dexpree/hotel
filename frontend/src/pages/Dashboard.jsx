import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";  
import "../styles/dashboard.css";


function Dashboard() {
  const [data, setData] = useState({});
  const [pendingTickets, setPendingTickets] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Dashboard stats
    API.get("/dashboard").then((res) => setData(res.data));

    // Complaints count
    API.get("/tickets").then((res) => {
      const pending = res.data.filter((t) => t.status !== "Resolved").length;
      setPendingTickets(pending);
    });
  }, []);

  return (
    <>
    <Navbar />
    
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div className="stats">
        <div className="stat-box">
          <h3>Total Rooms</h3>
          <p>{data.totalRooms}</p>
        </div>

        <div className="stat-box">
          <h3>Total Bookings</h3>
          <p>{data.totalBookings}</p>
        </div>

        <div className="stat-box">
          <h3>Available Rooms</h3>
          <p>{data.availableRooms}</p>
        </div>
      </div>

     

<button onClick={() => navigate("/admin/bookings")}>📖 Bookings</button>

<button onClick={() => navigate("/admin/rooms")}>🛏️ Manage Rooms</button>

<button onClick={() => navigate("/admin/add-room")}>➕ Add Room</button>

<button onClick={() => navigate("/admin/users")}>👥 Users</button>

<button onClick={() => navigate("/admin/feedback")}>💬 Feedback</button>

<button onClick={() => navigate("/admin/analytics")}>📈 Analytics</button>

<button onClick={() => navigate("/admin/services")}>🛎️ Services</button>


      {/* ✅ Complaints button with badge */}
      <button onClick={() => navigate("/admin/tickets")}>
       🤖 Complaints
        {pendingTickets > 0 && (
          <span className="badge-count">{pendingTickets}</span>
        )}
      </button>
    </div>
    </>
  );
}

export default Dashboard;
