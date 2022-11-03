import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";
import Nav from "../..//Nav/Nav";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";

import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
 

function Notifications(props) {

  const { db, auth } = props;
  const timePrefix = "2022-11-01T";

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const userPrefsDocRef = useRef(null);

  const navigate = useNavigate();

  async function onSave() {
    if (startTime === null) {
      alert("Start time cannot be empty.");
    }
    else if (endTime === null) {
      alert("End time cannot be empty.");
    }
    else {
      try {
        await updateDoc(userPrefsDocRef.current, {
          "notificationStartTime": startTime.hour(),
          "notificationEndTime": endTime.hour(),
        });
        alert("Notification settings Saved!");
        navigate("/settings");
      } catch (e) {
        alert("Failed to save settings. Please try again.");
      }
    }
  }

  useEffect(() => {
    async function helper() {
      userPrefsDocRef.current = doc(db, "user-preferences", auth.currentUser.uid);
      const userPrefsDoc = await getDoc(userPrefsDocRef.current);
      const userPrefsSnapshot = userPrefsDoc.data();
      setStartTime(dayjs(`${timePrefix}${userPrefsSnapshot["notificationStartTime"]}`));
      setEndTime(dayjs(`${timePrefix}${userPrefsSnapshot["notificationEndTime"]}`));
    }

    helper();
  }, []);

  if (startTime === null || endTime === null) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <div>
      <Nav />
      <NotificationBody
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <div>
        <button type="button" onClick={onSave} className="button">Save</button>
      </div>
    </div>
  );
};

export function NotificationBody(props) {

  const { startTime, setStartTime, endTime, setEndTime } = props;

  return (
    <>
      <div className="title">
        <p>What's a good time to receive notifications?</p>
      </div>
      <div className="timepicker">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          value={startTime}
          onChange={value => setStartTime(value)}
          shouldDisableTime={(time, type) => {
            if (type !== "hours") {
              return false;
            }
            // defaults
            // You cannot start from midnight for start time
            if (0 <= time && time < 8) {
              return true;
            }
            // If end time is at midnight, then the whole range should be enabled
            if (endTime.hour() == 0) {
              return !(8 <= time && time <= 23);
            }
            return endTime.hour() < time;
          }}
          views={["hours"]}
          renderInput={(params) => <TextField {...params} />}
        />
        <p>to</p>
        <MobileTimePicker
          value={endTime}
          onChange={value => setEndTime(value)}
          shouldDisableTime={(time, type) => {
            if (type !== "hours") {
              return false;
            }
            // defaults
            if (1 <= time && time < 8) {
              return true;
            }
            // Midnight will always be the latest time
            if (time == 0) {
              return false;
            }
            return time < startTime.hour();
          }}
          views={["hours"]}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      </div>
    </>
  )
}


export const DEFAULT_START_TIME = dayjs("2022-11-01T08:00");
export const DEFAULT_END_TIME = dayjs("2022-11-01T24:00");

export default Notifications;
