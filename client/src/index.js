import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import DoubleAuthPage from "./pages/DoubleAuthPage/DoubleAuthPage";
import LandingPage from "./pages/LandingPage/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/2FA",
    element: <DoubleAuthPage />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
