import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./router/Routes.jsx";
import AuthProvider from "./user/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={Routes} />
  </AuthProvider>
);
