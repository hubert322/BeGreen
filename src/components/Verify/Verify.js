import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailRedirectLogin } from "../../utils/auth";
import styles from "./Verify.module.css";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

function Verify(props) {

  const { setIsVerifying, db, auth } = props;
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {

    async function helper() {
      const userPrefsDocRef = doc(db, "user-preferences", auth.currentUser.uid);
      const userPrefsSnapshot = await getDoc(userPrefsDocRef);
      // If this is the user first time logging in, set the default preferences
      if (!userPrefsSnapshot.exists) {
        await setDoc(userPrefsDocRef, {
          "numChallenges": 3,
          "notificationStartTime": 8,
          "notificationEndTime": 23,
        });
      }
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
