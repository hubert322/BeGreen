import { useState } from "react";
import styles from "./NewPost.module.css";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import { IconContext } from "react-icons";
import { MdOutlineFlipCameraIos } from "react-icons/md";

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
    <div className={styles.container}>
      <Nav backTo="/" />
      <div className={styles.cameraContainer}>
        {dataUri ? (
          <>
            <img className={styles.imgPreview}src={dataUri}  />
            <div className={styles.descContainer}>
              <p className={styles.descTitle}>Caption</p>
              <textarea type="text" value={description} onChange={e => setDescription(e.target.value)} className={styles.descInput} />
            </div>
            <button className={styles.button} type="button" onClick={onUpload}>Upload</button>
            <button className={styles.secondarybutton} type="button" onClick={onRetake}>Retake</button>
          </>
        ) : (
          <>
            <Camera onTakePhoto={onTakePhoto} idealFacingMode={facingMode} />
            <IconContext.Provider value={{color: "white", size: "40px", className: styles.flip}}>
              <button type="button" onClick={onSwitch} className={styles.switchButton}>
                <MdOutlineFlipCameraIos />
              </button>
            </IconContext.Provider>
          </>
        )}
      </div>
    </div>
  )
}

export default NewPost;
