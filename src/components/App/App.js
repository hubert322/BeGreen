import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import Home from "../Home/Home";
import Onboarding from "../Onboarding/Onboarding";
import Signup from "../Signup/Signup";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/onboarding",
      element: <Onboarding />,
    },
    {
      path: "/signup",
      element: <Signup />,
    }
  ]);

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

  return (
    <RouterProvider router={router} />
  );
}

export default App;
