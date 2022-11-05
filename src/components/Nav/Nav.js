import { useNavigate } from "react-router-dom";
import styles from "./Nav.module.css";
import Shape from "../../assets/images/arrow-left.png";
import settings from "../../assets/images/more-vertical.png";

function Nav(props) {

  const { backTo } = props;
  const navigate = useNavigate();

  function onSettings() {
    navigate("/settings");
  }

  function onBack() {
    if (backTo !== null) {
      navigate(backTo);
    }
    else {
      navigate(-1);
    }
  }

  return (
    <nav className={styles.container}>
      <button 
        type="button"
        onClick={onBack}
        className={styles.backButton}
      >
        <img src={Shape} />
      </button>
      <button type="button" onClick={onSettings} className={styles.settings}>
        <img src={settings} />
      </button>
    </nav>
  );
};

export default Nav;
