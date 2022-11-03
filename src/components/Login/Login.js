import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../utils/auth";
import styles from "./Login.module.css";

function Login(props) {

  const { app } = props;

  const [loginStepCounter, setLoginStepCounter] = useState(0);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const loginMessages = [
    "Log in using your email",
    `Click on the email link sent to ${email} to finish logging in!`,
  ];

  const onContinue = useCallback(() => {
    if (loginStepCounter + 1 < loginMessages.length) {
      loginWithEmail(app, email)
      setLoginStepCounter(loginStepCounter + 1);
    } else {
      navigate("/", {replace: false});
    }
  }, [email, loginStepCounter, navigate]);

  const onSignup = useCallback(() => {
    navigate("/signup", {replace: false});
  }, [navigate]);

  return (
    <div>
      <div>
        <p className={styles.title}>{loginMessages[loginStepCounter]}</p>
      </div>
      <div>
        {loginStepCounter == 0 ? (
          <input className={styles.input} placeholder="Your email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        ) : null}
      </div>
      <div>
        {loginStepCounter == 0 ? (
          <button type="button" onClick={onContinue} className={styles.button}>Continue</button>
        ) : null}
        <button type="button" onClick={onSignup} className={styles.secondarybutton}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
