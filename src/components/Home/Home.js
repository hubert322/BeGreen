import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import settings from "../../assets/images/more-vertical.png";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function Home() {

  const [myImage, setMyImage] = useState(null);

  const navigate = useNavigate();

  const onSettings = useCallback(() => {
    navigate("/settings");
  }, [navigate]);

  function onTakePhoto(dataUri) {
    console.log(dataUri);
    setMyImage(dataUri);
  }

  return (
    <div >
      <nav>
        <button type="button" onClick={onSettings} className={styles.Settings}><img src={settings} /></button>
      </nav>
      <div>
        <div>
          {/* <Camera onTakePhoto={onTakePhoto} /> */}
          <img src={myImage} alt="myImage" />
        </div>
      </div>
    </div>
  );
}

export default Home;
