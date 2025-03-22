import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import NavBar from "./components/navBar/NavBar";
import Login from "./components/login/Login";
import { AuthProvider } from "./context/authContext";
import Courses from "./components/allcourses/Courses";
import Footer from "./components/footer/Footer";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: (
      <div>
        <NavBar/>
        <Footer/>
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
      {
        path: "/courses",
        element: <Courses/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
);
