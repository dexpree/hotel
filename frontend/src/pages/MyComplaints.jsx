import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";

function MyComplaints() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/tickets/my").then((res) => setTickets(res.data));
  }, []);

  return (
    <>
      <Navbar />
    
  
    <div className="container">
      {/* <button onClick={() => navigate("/rooms")}>⬅</button> */}
      

      <h2>📌 My Complaints</h2>

      {tickets.length === 0 && <p>No complaints submitted yet.</p>}

      {tickets.map((t) => (
        <div className="card" key={t._id}>
          <p><b>Title:</b> {t.title}</p>
          <p><b>Message:</b> {t.message}</p>
          <p><b>Priority:</b> {t.priority}</p>
          <p><b>Status:</b> {t.status}</p>
          <p><b>Date:</b> {new Date(t.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
    </>
  );
}

export default MyComplaints;
