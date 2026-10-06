import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";
import "../styles/adminAnalytics.css";

function AdminAnalytics() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics");
        setData(res.data);
      } catch (err) {
        alert("Failed to load analytics",err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!data) {
    return <h3 style={{ textAlign: "center" }}>Loading Analytics...</h3>;
  }

  return (
    <>
    <Navbar />
    <div className="container">
      <div className="top-actions">
        {/* <button onClick={() => navigate("/dashboard")}>⬅</button>
        <Logout /> */}
      </div>

      <h2>📊 Admin Analytics Dashboard</h2>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Total Users</h3>
          <p>{data.totalUsers}</p>
        </div>

        <div className="analytics-card">
          <h3>Total Rooms</h3>
          <p>{data.totalRooms}</p>
        </div>

        <div className="analytics-card green">
          <h3>Available Rooms</h3>
          <p>{data.availableRooms}</p>
        </div>

        <div className="analytics-card red">
          <h3>Not Available Rooms</h3>
          <p>{data.notAvailableRooms}</p>
        </div>

        <div className="analytics-card">
          <h3>Total Bookings</h3>
          <p>{data.totalBookings}</p>
        </div>

        <div className="analytics-card yellow">
          <h3>Pending Bookings</h3>
          <p>{data.pendingBookings}</p>
        </div>

        <div className="analytics-card green">
          <h3>Approved Bookings</h3>
          <p>{data.approvedBookings}</p>
        </div>

        <div className="analytics-card red">
          <h3>Rejected Bookings</h3>
          <p>{data.rejectedBookings}</p>
        </div>

        <div className="analytics-card red">
          <h3>Cancelled Bookings</h3>
          <p>{data.cancelledBookings}</p>
        </div>

        <div className="analytics-card green">
          <h3>Completed Bookings</h3>
          <p>{data.completedBookings}</p>
        </div>

        <div className="analytics-card revenue">
          <h3>Total Revenue</h3>
          <p>₹ {data.totalRevenue}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminAnalytics;
