import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import settings from "../../assets/images/more-vertical.png";

function Home() {

  const navigate = useNavigate();

  const onSettings = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  return (
    <div >
      <nav>
        <button type="button" onClick={onSettings} className="Settings"><img src={settings} /></button>
      </nav>
      <div>Content</div>
    </div>
  );
}

export default Home;
