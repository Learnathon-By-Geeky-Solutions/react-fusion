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
import CourseDetails from "./components/CourseDetails/CourseDetails";
import Footer from "./components/footer/Footer";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div>
        <NavBar />
        <h1>No Component Error</h1>
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courses/:id", 
        element: <CourseDetails />,
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
