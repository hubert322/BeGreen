import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Challenges.module.css";
import Nav from "../..//Nav/Nav";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";


function Challenges(props) {

  const { db, auth } = props;

  const navigate = useNavigate();
  const userPrefsDocRef = useRef(null);
  const [numChallenges, setNumChallenges] = useState(undefined);

  async function onSave() {
    try {
      await updateDoc(userPrefsDocRef.current, {
        "numChallenges": numChallenges
      });
      alert("Challenge settings Saved!");
      navigate("/settings");
    } catch (e) {
      alert("Failed to save settings. Please try again.");
    }
  }

  useEffect(() => {
    async function helper() {
      userPrefsDocRef.current = doc(db, "user-preferences", auth.currentUser.uid);
      const userPrefsDoc = await getDoc(userPrefsDocRef.current);
      const userPrefsSnapshot = userPrefsDoc.data();
      setNumChallenges(userPrefsSnapshot["numChallenges"]);
    }

    helper();
  }, []);

  if (numChallenges === undefined) {
    return (
      <div className={styles.title}>
        Loading...
      </div>
    )
  }
  return (
    <div>
      <Nav />
      <div className={styles.title}>
        <p>How many challenges do you want a day?</p>
      </div>
      <div className={styles.dropdown}>
        <select value={numChallenges} onChange={e => setNumChallenges(parseInt(e.target.value))} className={styles.optionsbox}>
          <option value={undefined} hidden> -- select an option -- </option>
          {[...Array(5).keys()].map((i) => (
            <option key={`num-challenges-${i + 1}`} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>
      <div>
        <button type="button" onClick={onSave} className={styles.button}>Save</button>
      </div>
    </div>
  );
};

export default Challenges;
