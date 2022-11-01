import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import Nav from "../Nav/Nav";

function Settings() {

  const navigate = useNavigate();

  const onNotifications = useCallback(() => {
    navigate("/settings/notifications", {replace: false});
  }, [navigate]);

  const onChallenges = useCallback(() => {
    navigate("/settings/challenges", {replace: false});
  }, [navigate]);

  return (
    <div>
      <Nav />
      <div>
        <button type="button" onClick={onNotifications}>Notifications</button>
        <button type="button" onClick={onChallenges}>Challenges</button>
      </div>
      <button>Log out</button>
    </div>
  );
};

export default Settings;
