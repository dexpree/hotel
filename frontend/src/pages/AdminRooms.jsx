import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import "../styles/common.css";

function AdminRooms() {

  const [rooms, setRooms] = useState([]);
  const [images, setImages] = useState({});
  const [editData, setEditData] = useState({});

  const navigate = useNavigate();

  // 🔒 Protect admin page
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login");
    }

  }, []);

  const fetchRooms = () => {
    API.get("/rooms").then((res) => setRooms(res.data));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const updateRoom = async (id, data) => {

    try {

      const formData = new FormData();

      if (data.type) formData.append("type", data.type);
      if (data.price) formData.append("price", data.price);
      if (data.status) formData.append("status", data.status);

      if (images[id]) {
        for (let i = 0; i < images[id].length; i++) {
          formData.append("images", images[id][i]);
        }
      }

      await API.put(`/rooms/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Room updated");

      fetchRooms();

    } catch (err) {

      alert("Update failed", err);

    }

  };

  const deleteRoom = async (id) => {

    if (!window.confirm("Delete this room?")) return;

    try {

      await API.delete(`/rooms/${id}`);

      alert("Room deleted");

      setRooms(rooms.filter((r) => r._id !== id));

    } catch (err) {

      alert("Delete failed", err);

    }

  };

  return (
       <>
    <Navbar />

    <div className="container">

      <AdminHeader />

      <h2>Manage Rooms</h2>

      {rooms.length === 0 && <p>No rooms found.</p>}

      {rooms.map((room) => (

        <div className="card" key={room._id}>

          <p><b>Room No:</b> {room.roomNumber}</p>

          {/* TYPE */}
          <label>Type:</label>
          <input
            defaultValue={room.type}
            onChange={(e) =>
              setEditData({
                ...editData,
                [room._id]: {
                  ...editData[room._id],
                  type: e.target.value
                }
              })
            }
          />

          {/* PRICE */}
          <label>Price:</label>
          <input
            type="number"
            defaultValue={room.price}
            onChange={(e) =>
              setEditData({
                ...editData,
                [room._id]: {
                  ...editData[room._id],
                  price: e.target.value
                }
              })
            }
          />

          {/* UPDATE ROOM BUTTON */}
          <button
            style={{ background: "#2563eb", marginTop: "10px" }}
            onClick={() =>
              updateRoom(room._id, editData[room._id] || {})
            }
          >
            Update Room
          </button>

          {/* IMAGE PREVIEW */}
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>

            {room.images?.map((img, index) => (

              <img
                key={index}
                src={`http://localhost:5000${img}`}
                alt="room"
                style={{
                  width: "80px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "6px"
                }}
              />

            ))}

          </div>

          {/* IMAGE UPLOAD */}
          <label style={{ marginTop: "10px" }}>Update Images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setImages({
                ...images,
                [room._id]: e.target.files
              })
            }
          />

          <button
            style={{ background: "#2563eb", marginTop: "10px" }}
            onClick={() => updateRoom(room._id, {})}
          >
            Update Images
          </button>

          {/* STATUS */}
          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color: room.status === "Available" ? "green" : "red",
                fontWeight: "bold"
              }}
            >
              {room.status}
            </span>
          </p>

          <button
            onClick={() =>
              updateRoom(room._id, { status: "Available" })
            }
          >
            Set Available
          </button>

          <button
            onClick={() =>
              updateRoom(room._id, { status: "Not Available" })
            }
            style={{ background: "orange" }}
          >
            Set Not Available
          </button>

          {/* DELETE */}
          <button
            onClick={() => deleteRoom(room._id)}
            style={{ background: "red", marginTop: "10px" }}
          >
            Delete Room
          </button>

        </div>

      ))}

    </div>
      </>

  );
}

export default AdminRooms;
