import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";
import Nav from "../..//Nav/Nav";
// import TimePicker from "react-time-picker";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";

import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

function Notifications(props) {

  const { db, auth } = props;
  const timePrefix = "2022-11-01T";
  const defaultMinTime = dayjs(`${timePrefix}08:00`);
  const defaultMaxTime = dayjs(`${timePrefix}23:59`);

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
          "notificationStartTime": startTime,
          "notificationEndTime": endTime,
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
      <div>
        <p>What's a good time to receive notifications?</p>
      </div>
      <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
          label="Time"
          value={startTime}
          onChange={value => setStartTime(value)}
          minTime={defaultMinTime}
          maxTime={endTime < defaultMaxTime ? endTime : defaultMaxTime}
          views={["hours"]}
          renderInput={(params) => <TextField {...params} />}
        />
        <p>to</p>
        <MobileTimePicker
          label="Time"
          value={endTime}
          onChange={value => setEndTime(value)}
          minTime={defaultMinTime < startTime ? startTime : defaultMinTime}
          maxTime={defaultMaxTime}
          views={["hours"]}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {/* <TimePicker
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
          format="hh a"
          minTime="08:00"
          maxTime={"23:00" < endTime ? endTime : "23:00"}
        />
        <p>to</p>
        <TimePicker
          value={endTime}
          onChange={setEndTime}
          format="hh a"
          minTime={"08:00" < startTime ? startTime : "08:00"}
          maxTime="23:00"
        /> */}
      </div>
      <div>
        <button type="button" onClick={onSave}>Save</button>
      </div>
    </div>
  );
};

export default Notifications;
