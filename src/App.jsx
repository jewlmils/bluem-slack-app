import React from "react";
import "./style.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LandingPage, SignIn, SignUp } from "@";
import { ErrorPage, Dashboard } from "@pages";
import { ProtectedRoutes } from "@utils";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/b",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "*",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
