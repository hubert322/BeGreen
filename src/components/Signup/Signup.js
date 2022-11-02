import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "./Signup.css";

function Signup() {

  const navigate = useNavigate();
  const [signupStepCounter, setSignupStepCounter] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [numChallenges, setNumChallenges] = useState(undefined);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("23:00");

  function getSignupComponents() {
    switch(signupStepCounter) {
      case 0:
        return (
          <>
            <p>Let's get started, what's your name?</p>
            <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          </>
        )
      case 1:
        return (
          <>
            <p>Create your account using your email</p>
            <input type="text" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} />
          </>
        );
        case 2:
          return (
            <>
              <p>How many challenges do you want a day</p>
              <select defaultValue={undefined} value={numChallenges} onChange={e => setNumChallenges(parseInt(e.target.value))}>
                <option disabled value={undefined}> -- select an option -- </option>
                {[...Array(5).keys()].map((i) => (
                  <option key={`num-challenges-${i + 1}`} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </>
          );
        case 3:
          return (
            <NotificationBody
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          );
    }
  }

  function onContinue() {
    if (signupStepCounter === 0 && name === "") {
      alert("Please enter your name.");
    }
    else if (signupStepCounter === 1 && email === "") {
      alert("Please enter your email.");
    }
    else if (signupStepCounter === 2 && numChallenges === undefined) {
      alert("Please select the number of challenges you want to receive a day.");
    }
    else if (signupStepCounter === 3 && startTime === "") {
      alert("Please select a start time for your notifications");
    }
    else if (signupStepCounter === 3 && endTime === "") {
      alert("Please select a end time for your notifications");
    }
    else if (signupStepCounter === 3 && !("08:00" <= startTime && startTime <= "23:00")) {
      console.log(startTime);
      alert("Start time has to be between 08:00 AM and 11:00 PM");
    }
    else if (signupStepCounter === 3 && !("08:00" <= endTime && endTime <= "23:00")) {
      alert("End time has to be between 08:00 AM and 11:59 PM");
    }
    else if (signupStepCounter === 3 && startTime > endTime) {
      alert("Start time has to be before end time");
    }
    else {
      if (signupStepCounter < 3) {
        setSignupStepCounter(signupStepCounter + 1);
      } else {
        navigate("/");
      }
    }
  }

  function disableContinue() {
    switch(signupStepCounter) {
      case 0:
        return name === "";
      case 1:
        return email === "";
      case 2:
        return numChallenges === null;
      case 3:
        return startTime === "" || endTime === "";
    }
  }

  return (
    <div>
      {getSignupComponents()}
      <button type="button" onClick={onContinue} disabled={disableContinue()}>Continue</button>
    </div>
  )
}

export default Signup;
