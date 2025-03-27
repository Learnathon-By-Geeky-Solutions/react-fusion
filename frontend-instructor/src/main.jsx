import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login"; // Import the correct Login component
import { AuthProvider } from "./context/authContext"; // Import AuthProvider

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />, 
    errorElement: <div>Not Found</div>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>
);
