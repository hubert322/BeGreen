import "./App.css";

import { Fragment, useEffect, useState } from "react";
import { createBrowserRouter, Navigate, RouterProvider, useLocation, BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';

import Home from "../Home/Home";
import Settings from "../Settings/Settings";
import Notifications from "../Settings/Notifications/Notifications";
import Challenges from "../Settings/Challenges/Challenges";
import Onboarding from "../Onboarding/Onboarding";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Auth from "../Auth/Auth";
import Verify from "../Verify/Verify";

import { logIn } from "../../utils/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {

  const [loggedIn, setLoggedIn] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyALVyDqiLOp7rm8uJy7A4SWLctS4XQKDN4",
    authDomain: "begreen-9e0cc.firebaseapp.com",
    projectId: "begreen-9e0cc",
    storageBucket: "begreen-9e0cc.appspot.com",
    messagingSenderId: "1099374593506",
    appId: "1:1099374593506:web:2b7ddcda1e288d22a965bb",
    measurementId: "G-34M8F5L65Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  const auth = getAuth(app);

  useEffect(() => {
    if (loggedIn) {
        setIsVerifying(false);
        navigate("/");
    } else if (loggedIn === false && !isVerifying) {
      setIsVerifying(false);
      navigate("/login");
    }
  }, [loggedIn, isVerifying]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);


  return (
    <>
      <header>BeGreen.</header>
      <Routes>
        {loggedIn === true ? (
          <Fragment>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/notifications" element={<Notifications />} />
            <Route path="/settings/challenges" element={<Challenges db={db} auth={auth} />} />
            <Route path="/onboarding" element={<Onboarding />} />
          </Fragment>
        ) : (
          <Route path="*" element={<Navigate to="/auth" />} />
        )}
        <Route path="/auth" element={<Auth />} />
        <Route path="/verify" element={<Verify setIsVerifying={setIsVerifying} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default AppWrapper;
