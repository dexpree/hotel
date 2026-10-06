import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../styles/common.css";

function CustomerBookings() {

  const [bookings, setBookings] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState({});

  // 🔥 NEW STATES
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const navigate = useNavigate();

  const loadBookings = () => {
    API.get("/bookings/my").then((res) => setBookings(res.data));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await API.put(`/bookings/${id}/cancel`);
      alert("Booking cancelled");
      loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  // ✅ PAYMENT FUNCTION
  const payNow = async (id) => {

    const method = paymentMethod[id];

    if (!method) {
      alert("Please select payment method");
      return;
    }

    try {
      await API.put(`/bookings/${id}/pay`, { method });

      alert(`Payment successful via ${method}`);
      loadBookings();

    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <h2>My Bookings</h2>

        {bookings.length === 0 && <p>No bookings</p>}

        {bookings.map((b) => (

          <div className="card" key={b._id}>

            <p><b>Room:</b> {b.roomId.roomNumber}</p>
            <p><b>Type:</b> {b.roomId.type}</p>
            <p><b>Price:</b> ₹{b.roomId.price}</p>

            <p>
              <b>Status:</b>{" "}
              <span className={`status ${
                b.status === "Approved"
                  ? "available"
                  : b.status === "Pending"
                  ? "pending"
                  : "not-available"
              }`}>
                {b.status}
              </span>
            </p>

            <p><b>Check-In:</b> {new Date(b.checkIn).toLocaleString()}</p>
            <p><b>Check-Out:</b> {new Date(b.checkOut).toLocaleString()}</p>

            {/* PAYMENT STATUS */}
            <p>
              <b>Payment:</b>{" "}
              <span style={{ color: b.paymentStatus === "Paid" ? "green" : "red" }}>
                {b.paymentStatus || "Unpaid"}
              </span>
            </p>

            {/* METHOD */}
            {b.paymentMethod && (
              <p><b>Method:</b> {b.paymentMethod}</p>
            )}

            {/* TXN */}
            {b.transactionId && (
              <p><b>Transaction ID:</b> {b.transactionId}</p>
            )}

            {/* PAY BUTTON → OPEN MODAL */}
            {b.status === "Approved" && b.paymentStatus !== "Paid" && (
              <button
                style={{ background: "green" }}
                onClick={() => {
                  setSelectedBooking(b);
                  setShowPaymentModal(true);
                }}
              >
                💳 Pay Now
              </button>
            )}

            {/* CANCEL */}
            {b.status === "Pending" && (
              <button
                style={{ background: "red" }}
                onClick={() => cancelBooking(b._id)}
              >
                Cancel Booking
              </button>
            )}

          </div>

        ))}

      </div>

      {/* 🔥 RAZORPAY STYLE MODAL */}

      {showPaymentModal && selectedBooking && (

        <div className="payment-modal">

          <div className="payment-box">

            <h2>💳 Secure Payment</h2>

            <p><b>Hotel:</b> Union Hotel</p>
            <p><b>Amount:</b> ₹{selectedBooking.roomId.price}</p>

            <select
              value={paymentMethod[selectedBooking._id] || ""}
              onChange={(e) =>
                setPaymentMethod({
                  ...paymentMethod,
                  [selectedBooking._id]: e.target.value
                })
              }
            >
              <option value="">Select Method</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
              <option value="CASH">Cash</option>
            </select>

            {/* DYNAMIC UI */}
            {paymentMethod[selectedBooking._id] === "UPI" && (
              <input placeholder="Enter UPI ID (example@upi)" />
            )}

            {paymentMethod[selectedBooking._id] === "CARD" && (
              <>
                <input placeholder="Card Number" />
                <input placeholder="Expiry MM/YY" />
                <input placeholder="CVV" />
              </>
            )}

            {paymentMethod[selectedBooking._id] === "CASH" && (
              <p style={{ color: "orange" }}>
                Pay at hotel reception
              </p>
            )}

            <div className="payment-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>

              <button
                className="pay-btn"
                onClick={async () => {
                  await payNow(selectedBooking._id);
                  setShowPaymentModal(false);
                }}
              >
                Pay ₹{selectedBooking.roomId.price}
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default CustomerBookings;