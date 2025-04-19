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
import CourseAnalytics from './components/analytics/Analytics';
import CreateCourse from './components/coursesCreate/CreateCourse';
import CreateMilestone from './components/coursesCreate/CreateMilestone';
import CreateModule from './components/coursesCreate/CreateModule';
import ContentPage from './components/coursesCreate/CreateContent';
import EditCourse from './components/coursesCreate/EditCourse';
import CoursePage from './components/coursePage/CoursePage';

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
        path: '/analytics/:courseId',
        element: <CourseAnalytics />
      },
      {
        path: '/courses/:courseId',
        element: <CoursePage />
      },
      {
        path: '/create-course',
        element: <CreateCourse />
      },
      {
        path: '/courses/:courseId/milestones',
        element: <CreateMilestone />
      },
      {
        path: '/module/:milestoneId',
        element: <CreateModule />
      },
      {
        path: '/content/:moduleId',
        element: <ContentPage />
      },
      {
        path: '/edit-course/:courseId',
        element: <EditCourse />
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
