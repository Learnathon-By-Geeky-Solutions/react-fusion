import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login/Login"; 
import Dashboard from "./components/dashboard/Dashboard"; 
import { AuthProvider } from "./context/authContext"; 
import App from "./App.jsx"; 

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> 
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>
);
