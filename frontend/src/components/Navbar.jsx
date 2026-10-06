import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import "../styles/navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");

  return (

    <>
      {/* TOP NAVBAR */}

    <div className="navbar">

  {/* LEFT MENU */}
    {/* LEFT MENU + BACK */}
  <div className="nav-left">

    {/* BACK BUTTON */}
    {location.pathname !== "/" && (
      <span className="back-btn" onClick={() => navigate(-1)}>
        ←
      </span>
    )}

    {/* MENU ICON */}
    <div className="menu-icon" onClick={() => setOpen(true)}>
      ☰
    </div>

  </div>

  {/* CENTER TITLE */}
  <div className="nav-center">
    <h2 className="hotel-name" onClick={() => navigate("/")}>
      🏨 Union Hotel
    </h2>
  </div>

  {/* RIGHT LOGOUT */}
  <div className="nav-right">
    <Logout />
  </div>

</div>

      {/* SIDEBAR */}

      <div className={`sidebar ${open ? "open" : ""}`}>

        <div className="close-btn" onClick={() => setOpen(false)}>
          ✖
        </div>

        {/* USER MENU */}

        {role !== "admin" && (
          <><br />
          <button onClick={() => navigate("/Rooms")}>🛌 Rooms</button>
             <button onClick={() => navigate("/my-bookings")}>📖 My Bookings</button>
        <button onClick={() => navigate("/profile")}>👤 Profile</button>
        <button onClick={() => navigate("/feedback")}>💬 Feedback</button>
        <button onClick={() => navigate("/services")}>🛎️ Services</button>
        <button onClick={() => navigate("/my-services")}>📌 My Services</button>
        <button onClick={() => navigate("/complaint")}>📩 Complaint</button>
            <button onClick={() => navigate("/my-complaints")}>🛠 My Complaints</button>
          </>
        )}

        {/* ADMIN MENU */}

        {role === "admin" && (
          <><br />
          <button onClick={() => navigate("/Dashboard")}>🏡 Home </button>
           

<button onClick={() => navigate("/admin/bookings")}>📖 Bookings</button>

<button onClick={() => navigate("/admin/rooms")}>🛏️ Manage Rooms</button>

<button onClick={() => navigate("/admin/add-room")}>➕ Add Room</button>

<button onClick={() => navigate("/admin/users")}>👥 Users</button>

<button onClick={() => navigate("/admin/feedback")}>💬 Feedback</button>

<button onClick={() => navigate("/admin/analytics")}>📈 Analytics</button>

<button onClick={() => navigate("/admin/services")}>🛎️ Services</button>



            <button onClick={() => navigate("/admin/tickets")}>🤖 Complaints</button>
          </>
        )}

        <Logout />

      </div>

    </>
  );
}

export default Navbar;