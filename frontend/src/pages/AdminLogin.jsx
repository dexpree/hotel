import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      if (res.data.role !== "admin") {
        alert("Not an admin account");
        return;
      }

      localStorage.setItem("token", res.data.token);

      navigate("/admin");

    } catch (err) {

      alert("Invalid credentials", err);

    }

  };

  return (
     <>
    <Navbar />

    <div className="container">

      <h2>Admin Login</h2>

      <input
        placeholder="Admin Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>

    </div>
      </>
  );

}

export default AdminLogin;
