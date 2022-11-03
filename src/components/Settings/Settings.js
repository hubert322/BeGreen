import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Settings.module.css";
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
    < >
      <Nav />
      <div>
        <button type="button" onClick={onNotifications} className={styles.Notifications}>Notifications</button>
        <button type="button" onClick={onChallenges} className={styles.Challenges}>Challenges</button>
      </div>
      <button className={styles.secondarybutton}>Log out</button>
    </>
  );
};



export default Settings
