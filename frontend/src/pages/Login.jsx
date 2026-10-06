import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import API from "../services/api";
import "../styles/auth.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/rooms");
      }

    } catch (err) {

      alert(err.response?.data?.message || "Invalid credentials");

    }

  };

  return (

    <div className="auth-container">

      <form className="auth-card" onSubmit={handleLogin}>

        {/* BACK BUTTON */}
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/home")}
        >
          ← Back
        </button>

        <h2>Login</h2>

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

        <button type="submit">Login</button>

        <p>
          Don’t have an account?{" "}
          <Link to="/signup">Sign up</Link>
        </p>

      </form>

    </div>

  );

}

export default Login;