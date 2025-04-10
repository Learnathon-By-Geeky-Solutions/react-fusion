import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './context/authContext';
import App from './App.jsx';
import SignUp from './components/signup/SignUp';
import MyCourses from './components/mycourses/MyCourses';
import AddCourse from './components/addCourse/addCourse';
import CourseAnalytics from './components/analytics/Analytics';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/my-courses',
        element: <MyCourses />
      },
      {
        path: '/add-courses',
        element: <AddCourse />
      },
      {
        path: '/analytics/:courseId',
        element: <CourseAnalytics></CourseAnalytics>
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
