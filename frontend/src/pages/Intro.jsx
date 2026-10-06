import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../styles/intro.css";

function Intro() {

  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {

    const fadeTimer = setTimeout(() => {
      setFade(true);   // start fade
    }, 4000);

    const navTimer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };

  }, [navigate]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (

    <div className={`intro-page ${fade ? "fade-out" : ""}`}>

      <div className="particles">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <h1 className="hotel-title">🏨 Union Hotel</h1>

      <div className="luxury-line"></div>

      <div className="intro-content">

        <h2>{greeting()}</h2>

        <h3 className="typewriter">
          Welcome to Union Hotel
        </h3>

        <p>Luxury • Comfort • Experience</p>

        <div className="loading-container">
          <div className="loading-bar"></div>
        </div>

      </div>

    </div>

  );

}

export default Intro;