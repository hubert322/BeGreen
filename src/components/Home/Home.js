import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  const onSettings = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  return (
    <div className="Home">
      <nav>
        <button type="button" onClick={onSettings}>Settings</button>
      </nav>
      <div>Content</div>
    </div>
  );
}

export default Home;
