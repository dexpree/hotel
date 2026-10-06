import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";

function Complaint() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Medium");

  const navigate = useNavigate();

  const submitComplaint = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tickets", {
        title,
        message,
        priority
      });

      alert("Complaint submitted successfully");
      navigate("/my-complaints");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
     <>
    <Navbar />
    <div className="container">
      {/* <button onClick={() => navigate("/rooms")}>⬅</button>
      <Logout /> */}

      <h2>📩 Raise Complaint</h2>

      <form onSubmit={submitComplaint}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Message</label>
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
      </>
  );
}

export default Complaint;
