import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

function Onboarding() {

  const [onboardingStepCounter, setOnBoardingStepCounter] = useState(0);
  const navigate = useNavigate();

  const onboardingMessages = [
    "One challenge everyday",
    "Create a carbon aware reminder",
    "All your friends do challenge at the most carbon unfriendly time",
    "Comment and react with your friends",
  ]

  const onSkip = useCallback(() => {
    navigate("/login", {replace: false});
  }, [navigate]);

  const onContinue = useCallback(() => {
    if (onboardingStepCounter + 1 < onboardingMessages.length) {
      setOnBoardingStepCounter(onboardingStepCounter + 1);
    } else {
      navigate("/login", {replace: false});
    }
  }, [onboardingStepCounter, navigate]);

  return (
    <div>
      <div>
        <button type="button" onClick={onSkip}>Skip</button>
      </div>
      <img alt="some-img" />
      <h2>{onboardingMessages[onboardingStepCounter]}</h2>
      <button 
        type="button"
        onClick={onContinue}
      >
        {onboardingStepCounter + 1 < onboardingMessages.length ?
        "Continue" :
        "Get Started"}
      </button>
      <div>....</div>
    </div>
  )
}

export default Onboarding;
