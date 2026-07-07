import React from "react";
import { router } from "./app.router.jsx";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
