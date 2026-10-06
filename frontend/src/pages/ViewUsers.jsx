import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import "../styles/common.css";
import "../styles/admin.css";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users").then(res => setUsers(res.data));
  }, []);

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

      <h2>Registered Users</h2>

      {users.length === 0 && <p>No users found</p>}

      {users.map(u => (
        <div className="card" key={u._id}>
          <p><b>Name:</b> {u.name}</p>
          <p><b>Email:</b> {u.email}</p>
          <p><b>Phone:</b> {u.phone || "N/A"}</p>
          <p><b>Address:</b> {u.address || "N/A"}</p>
          <p><b>ID Type:</b> {u.idType || "N/A"}</p>
          <p><b>ID Number:</b> {u.idNumber || "N/A"}</p>
        </div>
      ))}
    </div>
      </>
  );
}

export default ViewUsers;
