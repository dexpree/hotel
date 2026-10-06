import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page fade-in">
    <div className="home-container">
      <div className="home-overlay">
        <div className="home-content">
          <h1 className="hotel-title">🏨 Union Hotel</h1>

          <p className="hotel-tagline">
            Luxury Stay • Easy Booking • Smart Hotel Management
          </p>

          <div className="home-box">
            <h3>✨ Welcome</h3>
            <p>
              Experience premium comfort with a modern hotel booking system.
              Book rooms, request services, send complaints, and manage everything
              smoothly.
            </p>

            <h3>🚀 Features</h3>
            <ul>
              <li>✔ Booking Approval System</li>
              <li>✔ Payment Simulation (Paid / Unpaid)</li>
              <li>✔ Services (Laundry / Cleaning)</li>
              <li>✔ Complaint & Support Tickets</li>
              <li>✔ Admin Dashboard + Analytics</li>
            </ul>
          </div> 
          <p>
              location : 123 Main Street, Mysore,Karanataka, India | contact : +91 123-456-7890 | email :union@gmail.com
            </p>


          <div className="home-buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              🔑 Login
            </button>

            <button className="btn-secondary" onClick={() => navigate("/signup")}>
              📝 Signup
            </button>
          </div>

          <p className="footer-text">
            © 2026 Union Hotel Management System
          </p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
