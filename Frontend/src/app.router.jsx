import React from "react";
import { createBrowserRouter } from "react-router";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import Home from "./pages/Home.jsx";
import Interview from "./pages/Interview.jsx";
import LandingPage from "./pages/LandingPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/interview/:interviewId",
    element: <Interview />,
  },

  {
    path: "*",
    element: <Pagenotfound />,
  },
]);
