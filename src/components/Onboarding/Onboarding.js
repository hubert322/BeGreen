import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";

function Onboarding() {

  const [onboardingStepCounter, setOnBoardingStepCounter] = useState(0);
  const navigate = useNavigate();

  const onboardingMessage = [
    "One challenge everyday",
    "Create a carbon aware reminder",
    "All your friends do challenge at the most carbon unfriendly time",
    "Comment and react with your friends",
  ]

  const onContinue = useCallback(() => {
    if (onboardingStepCounter + 1 < onboardingMessage.length) {
      setOnBoardingStepCounter(onboardingStepCounter + 1);
    } else {
      navigate("/signup", {replace: false});
    }
  }, [onboardingStepCounter, navigate]);

  return (
    <div>
      <h1>BeGreen.</h1>
      <img alt="some-img" />
      <h2>{onboardingMessage[onboardingStepCounter]}</h2>
      <button 
        type="button"
        onClick={onContinue}
      >
        {onboardingStepCounter + 1 < onboardingMessage.length ?
        "Continue" :
        "Get Started"}
      </button>
      <div>....</div>
    </div>
  )
}

export default Onboarding;
