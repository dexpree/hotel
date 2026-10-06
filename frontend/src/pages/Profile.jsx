import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";
import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    idType: "",
    idNumber: "",
    password: ""
  });

  const [phoneError, setPhoneError] = useState("");

  /* LOAD PROFILE */
  useEffect(() => {
    API.get("/users/me").then(res => {
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
        idType: res.data.idType || "",
        idNumber: res.data.idNumber || "",
        password: ""
      });
    });
  }, []);

  /* PHONE VALIDATION */
  const validatePhone = (value) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    setPhoneError(
      phoneRegex.test(value) ? "" : "Enter a valid 10-digit mobile number"
    );
  };

  /* UPDATE PROFILE */
  const handleUpdate = async () => {
    if (phoneError) {
      alert("Fix phone number error");
      return;
    }

    await API.put("/users/me", form);
    alert("Profile updated");
    setForm({ ...form, password: "" });
  };

  return (
     <>
    <Navbar />
    <div className="container profile-box">
      <div className="top-actions">
        {/* <button onClick={() => navigate("/rooms")}>←</button>
        <Logout /> */}
      </div>

      <h2>My Profile</h2>

      <label>Name</label>
      <input value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <label>Email</label>
      <input value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <label>Phone</label>
      <input
        value={form.phone}
        maxLength="10"
        onChange={e => {
          const v = e.target.value.replace(/\D/g, "");
          setForm({ ...form, phone: v });
          validatePhone(v);
        }}
      />
      {phoneError && <p className="error">{phoneError}</p>}

      <label>Address</label>
      <textarea
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
      />

      <label>ID Type</label>
      <select
        value={form.idType}
        onChange={e => setForm({ ...form, idType: e.target.value })}
      >
        <option value="">Select</option>
        <option value="Aadhaar">Aadhaar</option>
        <option value="Passport">Passport</option>
        <option value="Driving License">Driving License</option>
      </select>

      <label>ID Number</label>
      <input
        value={form.idNumber}
        onChange={e => setForm({ ...form, idNumber: e.target.value })}
      />

      <label>New Password</label>
      <input
        type="password"
        placeholder="Leave blank to keep current"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={handleUpdate}>Update Profile</button>
    </div>
      </>
  );
}

export default Profile;
