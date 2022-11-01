import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";
import Nav from "../..//Nav/Nav";

function Notifications() {

  const navigate = useNavigate();

  const onSave = useCallback(() => {
    alert("Notificaion Settings Saved!");
  }, []);

  return (
    <div>
      <Nav />
      <div>
        <p>What's a good time to receive notifications?</p>
      </div>
      <div>
        <input type="time" />
        <p>to</p>
        <input type="time" />
      </div>
      <div>
        <button type="button" onClick={onSave}>Save</button>
      </div>
    </div>
  );
};

export default Notifications;
