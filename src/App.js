// import React, { useState } from "react";

import LogIn from "./LogInPage/LogIn";
import SignUp from "./signupPage/Signup";
import WelComeHome from "./LogInPage/WelComeHome";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App(props) {


  const router = createBrowserRouter([
    { path: "/", element: <SignUp onsubmit={props.handleLogin} /> },
    { path: "/login", element: <LogIn /> },
    { path: "/welcome", element: <WelComeHome /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
