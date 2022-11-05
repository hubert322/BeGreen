import { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import Nav from "../Nav/Nav";
import Profile from "../../assets/images/profile.png";
import { IconContext } from "react-icons";
import { FaHeart, FaCommentDots } from "react-icons/fa"

function Feed(props) {

  const { db, auth } = props;
  const [challenge, setChallenge] = useState(null);
  const [posts, setPosts] = useState([]);
  const [hasPosted, setHasPosted] = useState(false);
  const navigate = useNavigate();
  
  const { state } = useLocation();
  const { challengeId } = state;

  function onPost() {
    navigate("/newPost", {state: {challengedId: challengeId}});
  }

  // Get the challenge data
  useEffect(() => {
    async function helper() {
      const challengeDocRef = doc(db, "challenges", challengeId);
      const challengeDoc = await getDoc(challengeDocRef);
      setChallenge({
        id: challengeDoc.id,
        ...challengeDoc.data()
      });
    }

    helper()
  }, []);

  // Get the posts for this challenge
  useEffect(() => {
    async function helper() {
      const q = query(collection(db, "posts"), where("challengeId", "==", challengeId));
      const querySnapshot = await getDocs(q);
      const queriedPosts = []
      querySnapshot.forEach(doc => {
        if (doc.data()["uuid"] === auth.currentUser.uid) {
          setHasPosted(true);
        }
        queriedPosts.push({
          id: doc.id,
          ...doc.data()
        });
      })
      queriedPosts.sort((a, b) => a["timestamp"] >= b["timestamp"]);
      setPosts(queriedPosts);
    }

    helper()
  }, []);

  if (challenge === null) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className={styles.container}>
      <Nav backTo="/" />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{challenge["title"]}</h1>
        <p className={styles.description}>{challenge["description"]}</p>
      </div>
      <div className={styles.tabContainer}>
        <button className={styles.new} type="button">New</button>
        <button className={styles.ranking} type="button">Ranking</button>
      </div>
      <div className={styles.feed}>
        {posts.map((post, i) => (
          <div key={`post-${i}`} className={styles.post}>
            <div className={styles.postTop}>
              <img className={styles.profile} src={Profile} />
              <p className={styles.username}>isavetheworld</p>
              {!hasPosted ? (
                <p className={styles.numLikesHidden}># likes</p>
              ) : null}
            </div>
            <div className={styles.imgContainer}>
              <div className={`${styles["overlay"]} ` + (hasPosted ? "" : styles.blur)}>
                <img
                  className={`${styles["feedImg"]} `}
                  src={post["dataUri"]}
                />
              </div>
              {!hasPosted ? (
                <button className={styles.postButton} type="button" onClick={onPost}>Post to view</button>
              ) : (
                <div className={styles.overlayContainer}>
                  <span className={styles.desc}>{post["description"]}</span><br />
                  <IconContext.Provider value={{color: "white", size: "20px", className: styles.likeButton}}>
                    <FaHeart>
                      <button />
                    </FaHeart>
                  </IconContext.Provider>
                  <p className={styles.likeText}>328.7K</p>
                  <IconContext.Provider value={{color: "white", size: "20px", className: styles.commentButton}}>
                    <FaCommentDots>
                      <button />
                    </FaCommentDots>
                  </IconContext.Provider>
                  <p className={styles.commentText}>578</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed;
