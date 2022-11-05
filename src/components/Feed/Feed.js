import { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import Nav from "../Nav/Nav";
import profile1 from "../../assets/images/profile1.png";
import profile2 from "../../assets/images/profile2.png";
import profile3 from "../../assets/images/profile3.png";
import { IconContext } from "react-icons";
import { FaHeart, FaCommentDots } from "react-icons/fa"

function Feed(props) {

  const { db, auth } = props;
  const [challenge, setChallenge] = useState(null);
  const [posts, setPosts] = useState([]);
  const [hasPosted, setHasPosted] = useState(false);
  const [isNew, setIsNew] = useState(true);

  const navigate = useNavigate();
  
  const { state } = useLocation();
  const { challengeId } = state;

  const samplePosts = [
    {
      profile: profile1,
      username: "isavetheworld",
      likes: "50K",
      comments: 568,
    },
    {
      profile: profile3,
      username: "sad",
      likes: "0",
      comments: 0
    },
    {
      profile: profile2,
      username: "iamnice",
      likes: "378K",
      comments: 300
    }
  ]

  function onPost() {
    navigate("/newPost", {state: {challengeId: challengeId}});
  }

  function onNew() {
    setIsNew(true);
    posts.sort((a, b) => a.timeStamp > b.timeStamp ? -1 : 1);
    setPosts(posts);
  }

  function onRanking() {
    setIsNew(false);
    posts.sort((a, b) => {
      const aLikes = parseInt(a.likes.replace("K", "000"));
      const bLikes = parseInt(b.likes.replace("K", "000"));
      return aLikes > bLikes ? -1 : 1;
    });
    setPosts(posts);
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
        let samplePost = {
          profile: profile1,
          username: "isavetheworld",
          likes: "50K",
          comments: 568,
        }
        if (queriedPosts.length < samplePosts.length) {
          samplePost = samplePosts[queriedPosts.length];
        }
        queriedPosts.push({
          id: doc.id,
          ...doc.data(),
          ...samplePost
        });
      })
      queriedPosts.sort((a, b) => a.timeStamp > b.timeStamp ? -1 : 1);
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
        <button className={`${styles["new"]} ` + (isNew ? styles.boldTab : styles.lightTab)} type="button" onClick={onNew}>New</button>
        <button className={`${styles["ranking"]} ` + (!isNew ? styles.boldTab : styles.lightTab)} type="button" onClick={onRanking}>Ranking</button>
      </div>
      <div className={styles.feed}>
        {posts.map((post, i) => (
          <div key={`post-${i}`} className={styles.post}>
            <div className={styles.postTop}>
              <img className={styles.profile} src={post.profile} />
              <p className={styles.username}>{post.username}</p>
              {!hasPosted ? (
                <p className={styles.numLikesHidden}>{post.likes}</p>
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
                <div className={`${styles["overlayContainer"]} ${styles["offset"]}`}>
                  <span className={styles.desc}>{post["description"]}</span><br />
                  <IconContext.Provider value={{color: "white", size: "20px", className: styles.likeButton}}>
                    <FaHeart>
                      <button />
                    </FaHeart>
                  </IconContext.Provider>
                  <p className={styles.likeText}>{post.likes}</p>
                  <IconContext.Provider value={{color: "white", size: "20px", className: styles.commentButton}}>
                    <FaCommentDots>
                      <button />
                    </FaCommentDots>
                  </IconContext.Provider>
                  <p className={styles.commentText}>{post.comments}</p>
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
