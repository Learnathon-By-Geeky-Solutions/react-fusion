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
import CourseDetails from './components/courseDetails/CourseDetails';
import CreateCourse from './components/courses/CreateCourse';
// import CreateMilestone from './components/courses/CreateMilestone';
// import CreateModule from './components/courses/CreateModule';
import CourseList from './components/courses/CourseList';
import CreateMilestone from './components/courses/CreateMilestone';
import CreateModule from './components/courses/CreateModule';
import EditMilestone from './components/courses/EditMilestone';
import ContentPage from './components/courses/CreateContent';

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
        element: <CourseDetails />
      },
      {
        path: '/create-course',
        element: <CreateCourse />
      },
      {
        path: '/courses',
        element: <CourseList />
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
        path: '/milestone/:milestoneId/edit',
        element: <EditMilestone />
      },
      {
        path: '/content/:moduleId',
        element: <ContentPage />
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
