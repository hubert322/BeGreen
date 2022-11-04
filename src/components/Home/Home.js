import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { collection, getDocs, query } from "firebase/firestore/lite";
import Bubbles from "../../assets/images/friendsbubble.png";
import Numbers from "../../assets/images/numbers.png";

function Home(props) {

  const { db } = props;
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    async function helper() {
      const q = query(collection(db, "challenges"));
      const querySnapshot = await getDocs(q);
      const queriedChallenges = []
      querySnapshot.forEach(doc => {
        queriedChallenges.push({
          id: doc.id,
          ...doc.data()
        });
      })
      setChallenges(queriedChallenges);
    }

    helper();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {challenges.map((challenge, i) => (
        <ChallengeCard key={`challenge-${i}`} challenge={challenge} />
      ))}
    </div>
  );
}

function ChallengeCard(props) {

  const { challenge } = props;
  const navigate = useNavigate();

  function onCheckIn() {
    navigate(`/feed?challengeId=${challenge["id"]}`)
  }

  return (
    <div className={styles.challenge}>
        <p className={styles.title}>{challenge["title"]}</p>
        <p className={styles.description}>{challenge["description"]}</p>
        <img  className={styles.bubbles} src={Bubbles} />
        <img  className={styles.numbers} src={Numbers} />
        <button className={styles.checkinbutton} type="button" onClick={onCheckIn}>Check-In for challenge</button>
    </div>
  )
}

export default Home;
