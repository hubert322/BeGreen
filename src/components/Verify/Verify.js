import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailRedirectLogin } from "../../utils/auth";
import "./Verify.css";

function Verify(props) {

  const { setIsVerifying } = props;
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    setIsVerifying(true);
    emailRedirectLogin().then((val) => {
      if (val) {
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
