import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/signup", {
        name,
        email,
        password
      });

      alert("Signup successful. Please login.");

      navigate("/");

    } catch (err) {

      alert(err.response?.data?.message || "Signup failed");

    }

  };

  return (

    <div className="auth-container">

      <form className="auth-card" onSubmit={handleSignup}>

        {/* BACK BUTTON */}
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/home")}
        >
          ← Back
        </button>

        <h2>Create Account</h2>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>

        <p>
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>

      </form>

    </div>

  );

}

export default Signup;