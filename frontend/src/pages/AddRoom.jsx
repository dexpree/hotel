import { useState } from "react";
import API from "../services/api";
import AdminHeader from "../components/AdminHeader";
import Navbar from "../components/Navbar";
import "../styles/common.css";

function AddRoom() {
  const [roomNumber, setRoomNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const handleAdd = async () => {
    try {

      const formData = new FormData();

      formData.append("roomNumber", roomNumber);
      formData.append("type", type);
      formData.append("price", price);

      // append multiple images
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      await API.post("/rooms", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Room added successfully");

      // reset fields
      setRoomNumber("");
      setType("");
      setPrice("");
      setImages([]);

    } catch (err) {
      alert(err.response?.data?.message || "Failed to add room");
    }
  };

  return (
    <>
    <Navbar />
    <div className="container">
      <AdminHeader />

      <h2>Add Room</h2>

      <input
        placeholder="Room Number"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      />

      <input
        placeholder="Type (Deluxe, Suite, VIP...)"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Image Upload */}
      <label style={{ marginTop: "10px" }}>Upload Room Images</label>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => setImages(e.target.files)}
      />

      <button style={{ marginTop: "15px" }} onClick={handleAdd}>
        Add Room
      </button>
    </div>
    </>
  );
  
}

export default AddRoom;
