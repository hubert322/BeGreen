import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailRedirectLogin } from "../../utils/auth";
import "./Verify.css";
import { doc, updateDoc } from "firebase/firestore/lite";

function Verify(props) {

  const { setIsVerifying, db, auth } = props;
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {

    async function helper() {
      const userPrefsDocRef = doc(db, "user-preferences", auth.currentUser.uid);
      await updateDoc(userPrefsDocRef, {
        "numChallenges": 3,
        "notificationStartTime": "08:00",
        "notificationEndTime": "23:00",
      });
    }

    setIsVerifying(true);
    emailRedirectLogin().then(async (val) => {
      if (val) {
        await helper();
        navigate("/");
      } else {
        setMessage("Failed to verify...");
      }
    })
  }, [])

  return (
    <div>
      {message}
    </div>
  );
}

export default Verify;
