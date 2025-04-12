import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/home/Home';
import NavBar from './components/navBar/NavBar';
import Login from './components/login/Login';
import { AuthProvider } from './context/authContext';
import Courses from './components/allcourses/Courses';
import CourseDetails from './components/CourseDetails/CourseDetails';
import Footer from './components/footer/Footer';
import Signup from './components/signup/SignUp';
import CoursePage from './components/coursePage/CoursePage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import MyCourses from './components/myCourses/MyCourses';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import AboutUs from './components/about/About';
import ContactUs from './components/contact/Contact';

const routes = createBrowserRouter([
  {
    path: '/',
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
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/courses',
        element: <Courses />
      },
      {
        path: '/about',
        element: <AboutUs />
      },
      {
        path: '/contact',
        element: <ContactUs />
      },
      {
        path: '/courses/:id',
        element: <CourseDetails />
      },
      {
        path: '/enrolled/:id',
        element: (
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        )
      },
      {
        path: '/my-courses',
        element: (
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        )
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>
);
