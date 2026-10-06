import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/rooms.css";

function Rooms() {

  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [pendingComplaints, setPendingComplaints] = useState(0);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortPrice, setSortPrice] = useState("none");

  const [imageIndex] = useState({});

  const [previewImages, setPreviewImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  const loadRooms = () => {
    API.get("/rooms").then((res) => setRooms(res.data));
  };

  useEffect(() => {

    loadRooms();

    API.get("/tickets/my").then((res) => {
      const pending = res.data.filter((t) => t.status !== "Resolved").length;
      setPendingComplaints(pending);
    });

    const interval = setInterval(() => {
      loadRooms();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const startBooking = (roomId) => {
    setActiveRoom(roomId);
    setCheckIn("");
    setCheckOut("");
  };

  const confirmBooking = async (roomId) => {

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out date & time");
      return;
    }

    try {

      await API.post("/bookings", {
        roomId,
        checkIn,
        checkOut
      });

      alert("Booking request sent");

      setActiveRoom(null);

      loadRooms();

      navigate("/my-bookings");

    } catch (err) {

      alert(err.response?.data?.message || "Booking failed");

    }

  };

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setAvailableOnly(false);
    setSortPrice("none");
  };

  const openPreview = (images, index) => {
    setPreviewImages(images);
    setPreviewIndex(index);
    setShowPreview(true);
  };

  let filteredRooms = rooms.filter((room) => {

    const matchesSearch =
      room?.roomNumber?.toString().includes(search) ||
      room?.type?.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All" ? true : room?.type === typeFilter;

    const matchesAvailability =
      availableOnly ? room?.status === "Available" : true;

    return matchesSearch && matchesType && matchesAvailability;

  });

  if (sortPrice === "low") {
    filteredRooms = [...filteredRooms].sort(
      (a, b) => Number(a?.price || 0) - Number(b?.price || 0)
    );
  }

  if (sortPrice === "high") {
    filteredRooms = [...filteredRooms].sort(
      (a, b) => Number(b?.price || 0) - Number(a?.price || 0)
    );
  }

  const getTypeClass = (type) => {

    if (!type) return "badge-default";

    switch (type.toLowerCase()) {
      case "normal": return "badge-normal";
      case "standard": return "badge-standard";
      case "deluxe": return "badge-deluxe";
      case "suite": return "badge-suite";
      case "vip": return "badge-vip";
      case "executive": return "badge-executive";
      case "penthouse": return "badge-penthouse";
      case "presidential": return "badge-presidential";
      default: return "badge-default";
    }

  };

  return (
    <>
      <Navbar />
    
    <div className="container">

      <h2>Rooms</h2>

      {/* <div className="top-actions">

        <button onClick={() => navigate("/my-bookings")}>📖 My Bookings</button>
        <button onClick={() => navigate("/profile")}>👤 Profile</button>
        <button onClick={() => navigate("/feedback")}>💬 Feedback</button>
        <button onClick={() => navigate("/services")}>🛎️ Services</button>
        <button onClick={() => navigate("/my-services")}>📌 My Services</button>
        <button onClick={() => navigate("/complaint")}>📩 Complaint</button>

        <button onClick={() => navigate("/my-complaints")}>
          🛠 My Complaints
          {pendingComplaints > 0 &&
            <span className="badge-count">{pendingComplaints}</span>
          }
        </button>

        

      </div> */}

      <div className="filter-bar">

        <input
          type="text"
          placeholder="Search by Room Number or Type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="normal">Normal</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Suite">Suite</option>
          <option value="VIP">VIP</option>
        </select>

        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
        >
          <option value="none">Sort by Price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          Available Only
        </label>

        <button className="clear-btn" onClick={clearFilters}>
          Clear Filters
        </button>

      </div>

      {filteredRooms.length === 0 && (
        <p style={{ marginTop: "20px" }}>No rooms found.</p>
      )}

      {filteredRooms.map((room) => {

        const images = room?.images?.length
          ? room.images.map(img => `http://localhost:5000${img}`)
          : [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
          ];

        const index = imageIndex[room._id] || 0;

        return (

          <div className="card" key={room._id}>

            <div className="image-slider">

              <img
                src={images[index]}
                alt="Room"
                className="room-image"
                onClick={() => openPreview(images, index)}
              />

              {/* IMAGE DOTS */}
              <div className="image-dots">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i === index ? "active-dot" : ""}`}
                  />
                ))}
              </div>

            </div>

            <div className="room-header">

              <p><b>Room:</b> {room?.roomNumber || "N/A"}</p>

              <span className={`room-badge ${getTypeClass(room?.type)}`}>
                {room?.type || "Unknown"}
              </span>

            </div>

            <p><b>Price:</b> ₹{room?.price || 0}</p>

            <span className={`status ${
              room?.status === "Available"
                ? "available"
                : "not-available"
            }`}>
              {room?.status || "Unknown"}
            </span>

            {room?.status === "Available" && activeRoom !== room._id && (
              <button onClick={() => startBooking(room._id)}>
                Book
              </button>
            )}

            {activeRoom === room._id && (

              <div style={{ marginTop: "10px" }}>

                <label>Check-In</label>
                <input
                  type="datetime-local"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />

                <label>Check-Out</label>
                <input
                  type="datetime-local"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />

                <button onClick={() => confirmBooking(room._id)}>
                  Confirm Booking
                </button>

                <button
                  style={{ marginLeft: "10px", background: "gray" }}
                  onClick={() => setActiveRoom(null)}
                >
                  Cancel
                </button>

              </div>

            )}

          </div>

        );

      })}

      {showPreview && (

        <div className="image-modal">

          <button
            className="close-btn"
            onClick={() => setShowPreview(false)}
          >
            ✖
          </button>

          <button
            className="modal-btn left"
            onClick={() =>
              setPreviewIndex(
                previewIndex === 0
                  ? previewImages.length - 1
                  : previewIndex - 1
              )
            }
          >
            ◀
          </button>

          <img
            src={previewImages[previewIndex]}
            alt="Preview"
            className="modal-image"
          />

          <button
            className="modal-btn right"
            onClick={() =>
              setPreviewIndex(
                (previewIndex + 1) % previewImages.length
              )
            }
          >
            ▶
          </button>

        </div>

      )}

    </div>
    </>

  );

}

export default Rooms;
