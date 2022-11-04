import { useState } from "react";
import styles from "./NewPost.module.css";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";

function NewPost(props) {

  const { db, auth } = props;

  const [dataUri, setDataUri] = useState(null);
  const [facingMode, setFacingMode] = useState(FACING_MODES.ENVIRONMENT);
  const [description, setDescription] = useState("");

  const { state } = useLocation();
  const { challengeId } = state;

  const navigate = useNavigate();

  function onTakePhoto(dataUri) {
    setDataUri(dataUri);
  }

  function onRetake() {
    setDataUri(null);
  }

  async function onUpload() {
    const postsDocRef = doc(collection(db, "posts"));
    await setDoc(postsDocRef, {
      "uuid": auth.currentUser.uid,
      "dataUri": dataUri,
      "numLikes": 0,
      "timeStamp": Date.now(),
      "description": description,
      "challengeId": challengeId
    })
    navigate("/");
  }

  function onSwitch() {
    if (facingMode === FACING_MODES.ENVIRONMENT) {
      setFacingMode(FACING_MODES.USER);
    }
    else {
      setFacingMode(FACING_MODES.ENVIRONMENT);
    }
  }

  return (
    <div>
      <Nav backTo="/" />
      <div>
        {dataUri ? (
          <>
            <img className={styles.imgPreview}src={dataUri}  />
            <div>
              <p>Description</p>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
            <button className={styles.button} type="button" onClick={onUpload}>Upload</button>
              <button className={styles.secondarybutton} type="button" onClick={onRetake}>Retake</button>
            </div>
          </>
        ) : (
          <>
            <Camera onTakePhoto={onTakePhoto} idealFacingMode={facingMode} />
            <button type="button" onClick={onSwitch}>Switch</button>
          </>
        )}
      </div>
    </div>
  )
}

export default NewPost;
