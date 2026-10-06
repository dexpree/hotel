import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";
import "../styles/admin.css";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const loadBookings = () => {
    API.get("/bookings").then((res) => setBookings(res.data));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      alert("Booking updated");
      loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update booking");
    }
  };

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

      <h2>All Bookings</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div className="card" key={b._id}>
          <h4>User</h4>
          <p>
            {b.userId?.name} ({b.userId?.email})
          </p>

          <h4>Room</h4>
          <p>
            Room {b.roomId?.roomNumber} – {b.roomId?.type}
          </p>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                fontWeight: "bold",
                color:
                  b.status === "Approved"
                    ? "green"
                    : b.status === "Pending"
                    ? "orange"
                    : b.status === "Completed"
                    ? "purple"
                    : "red",
              }}
            >
              {b.status}
            </span>
          </p>

          {/* ✅ PAYMENT STATUS */}
          <p>
            <b>Payment:</b>{" "}
            <span
              style={{
                fontWeight: "bold",
                color: b.paymentStatus === "Paid" ? "green" : "red",
              }}
            >
              {b.paymentStatus || "Unpaid"}
            </span>
          </p>

          {/* ✅ TRANSACTION DETAILS */}
          {b.transactionId && (
            <p>
              <b>Transaction ID:</b> {b.transactionId}
            </p>
          )}

          {b.paidAt && (
            <p>
              <b>Paid At:</b> {new Date(b.paidAt).toLocaleString()}
            </p>
          )}

          <p>
            <b>Check-In:</b> {new Date(b.checkIn).toLocaleString()}
          </p>

          <p>
            <b>Check-Out:</b> {new Date(b.checkOut).toLocaleString()}
          </p>

          {/* ✅ ADMIN APPROVAL */}
          {b.status === "Pending" && (
            <>
              <button onClick={() => updateStatus(b._id, "Approved")}>
                Approve
              </button>

              <button
                style={{ marginLeft: "10px", background: "red" }}
                onClick={() => updateStatus(b._id, "Rejected")}
              >
                Reject
              </button>
            </>
          )}

          {/* ✅ MARK COMPLETED BUTTON (ONLY AFTER CHECKOUT DATE) */}
          {b.status === "Approved" && new Date(b.checkOut) < new Date() && (
            <button
              style={{ marginTop: "10px", background: "purple" }}
              onClick={() => updateStatus(b._id, "Completed")}
            >
              ✅ Mark Completed
            </button>
          )}
        </div>
      ))}
    </div>
      </>
  );
}

export default AdminBookings;
