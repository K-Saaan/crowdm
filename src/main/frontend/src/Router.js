import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Admin from "./routes/Admin";
import Dashboard from "./routes/Dashboard";
import FaQ from "./routes/FaQ";
import LogIn from "./routes/LogIn";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import UploadVideo from "./routes/UploadVideo";
import Detail from "./routes/Detail";
import DirectorSignUp from "./components/SignUp/DirectorSignUp"
import HostSignUp from "./components/SignUp/HostSignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "detail",
          element: <Detail />, }
        ]
      },
      {
        path: "faq",
        element: <FaQ />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
        // children: [
        //   { path: "directorsignup",
        //     element: <DirectorSignUp />, },
        //   { path: "hostsignup",
        //     element: <HostSignUp />, }
        // ]
      },
      {
        path: "directorsignup",
        element: <DirectorSignUp />,
      },
      {
        path: "hostsignup",
        element: <HostSignUp />,
      },
    ],
  },
]);


export default router;