import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";
import "../styles/admin.css";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/feedback").then(res => setFeedbacks(res.data));
  }, []);

  return (
     <>
    <Navbar />
    <div className="container">
      <div className="admin-header">
        {/* <button onClick={() => navigate("/dashboard")}>
          ←
        </button>
        <Logout /> */}
      </div>

      <h2>User Feedback</h2>

      {feedbacks.length === 0 && <p>No feedback yet</p>}

      {feedbacks.map(f => (
        <div className="card" key={f._id}>
          <p><b>User:</b> {f.userId.name} ({f.userId.email})</p>
          <p><b>Rating:</b> {f.rating} / 5</p>
          <p><b>Message:</b> {f.message}</p>
          <p><b>Date:</b> {new Date(f.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
      </>
  );
}

export default AdminFeedback;
