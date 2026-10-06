import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";

function Feedback() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  const submitFeedback = async () => {
    if (!message) {
      alert("Please enter feedback");
      return;
    }

    await API.post("/feedback", { message, rating });
    alert("Thank you for your feedback!");
    navigate("/rooms");
  };

  return (
     <>
    <Navbar />
    <div className="container">
      {/* <button onClick={() => navigate("/rooms")}>
        ←
      </button>
      <Logout /> */}

      <h2>Feedback</h2>

      <label>Rating</label>
      <select value={rating} onChange={e => setRating(e.target.value)}>
        <option value={5}>★★★★★ (5)</option>
        <option value={4}>★★★★☆ (4)</option>
        <option value={3}>★★★☆☆ (3)</option>
        <option value={2}>★★☆☆☆ (2)</option>
        <option value={1}>★☆☆☆☆ (1)</option>
      </select>

      <label>Your Feedback</label>
      <textarea
        rows="4"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <button onClick={submitFeedback}>
        Submit Feedback
      </button>
    </div>
      </>
  );
}

export default Feedback;
