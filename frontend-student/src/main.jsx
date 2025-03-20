import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import NavBar from "./components/navBar/NavBar";
import Login from "./components/login/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: (
      <div>
        <NavBar></NavBar>
        <h1>No Component!</h1>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
);
