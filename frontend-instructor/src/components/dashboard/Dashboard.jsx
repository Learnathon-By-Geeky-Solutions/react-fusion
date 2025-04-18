import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useAuth from '@/src/context/authContext';
import useApi from '@/src/hooks/useApi';
import { dashboardService } from '@/src/services/dashboard';

export default function CourseDashboard() {
  const { instructor, isLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    if (!isLoading && instructor?.authenticated && loading) {
      const fetchInstructorAnalytics = async () => {
        try {
          const res = await fetchData(dashboardService.getAnalytics, {});
          setProfile(res.data);
        } catch (err) {
          setError('Failed to fetch instructor analytics');
        } finally {
          setLoading(false);
        }
      };

      fetchInstructorAnalytics();
    }
  }, [instructor, isLoading, fetchData, loading]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <div className='text-gray-600 text-lg'>
          <svg
            className='animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500 inline'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          Checking authentication...
        </div>
      </div>
    );
  }

  if (!instructor?.authenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='bg-gray-50 min-h-screen py-8'>
      <div className='max-w-[1280px] mx-auto px-4 sm:px-6'>
        {loading ? (
          <div className='flex items-center justify-center h-64'>
            <div className='text-gray-600 text-lg'>
              <svg
                className='animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500 inline'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Loading courses...
            </div>
          </div>
        ) : error ? (
          <div className='bg-red-50 border-l-4 border-red-500 p-4 rounded shadow'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-red-500'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-red-700'>{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className='text-center mb-10'>
              <h1 className='text-3xl font-bold text-gray-800'>
                Welcome back,{' '}
                <span className='text-blue-600'>
                  {instructor.name || 'Instructor'}
                </span>
              </h1>
              <p className='text-gray-600 mt-2'>
                Here's an overview of your teaching profile
              </p>
            </div>

            {/* Stats Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
              <div className='bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-blue-600'>
                <div className='p-6'>
                  <div className='flex items-center'>
                    <div className='p-3 rounded-full bg-blue-100 mr-4'>
                      <svg
                        className='h-8 w-8 text-blue-600'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                        />
                      </svg>
                    </div>
                    <div>
                      <div className='text-sm font-medium text-gray-500'>
                        Total Courses
                      </div>
                      <div className='text-3xl font-bold text-gray-900'>
                        {profile?.totalCourses || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-green-600'>
                <div className='p-6'>
                  <div className='flex items-center'>
                    <div className='p-3 rounded-full bg-green-100 mr-4'>
                      <svg
                        className='h-8 w-8 text-green-600'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                        />
                      </svg>
                    </div>
                    <div>
                      <div className='text-sm font-medium text-gray-500'>
                        Total Students
                      </div>
                      <div className='text-3xl font-bold text-gray-900'>
                        {profile?.totalStudents || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-amber-600'>
                <div className='p-6'>
                  <div className='flex items-center'>
                    <div className='p-3 rounded-full bg-amber-100 mr-4'>
                      <svg
                        className='h-8 w-8 text-amber-600'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                        />
                      </svg>
                    </div>
                    <div>
                      <div className='text-sm font-medium text-gray-500'>
                        Average Rating
                      </div>
                      <div className='text-3xl font-bold text-gray-900'>
                        {profile?.avgRating || '0'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Analytics Table */}
            <div className='bg-white rounded-xl shadow-md overflow-hidden'>
              <div className='px-6 py-5 border-b border-gray-200'>
                <h2 className='text-2xl font-bold text-gray-800'>
                  Course Analytics
                </h2>
              </div>

              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-2/4'
                      >
                        Course Title
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4'
                      >
                        Rating
                      </th>
                      <th
                        scope='col'
                        className='px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider w-1/4'
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {profile?.courses && profile.courses.length > 0 ? (
                      profile.courses.map((course) => (
                        <tr key={course.id} className='hover:bg-gray-50'>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            {course.title}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'>
                            <div className='flex items-center'>
                              <span className='text-amber-500 mr-1'>⭐</span>
                              {course.rating || '0'}
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center'>
                            <Link
                              to={`/analytics/${course.id}`}
                              className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan='3'
                          className='px-6 py-4 text-center text-sm text-gray-500'
                        >
                          No courses found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {profile?.courses && profile.courses.length === 0 && (
                <div className='text-center py-12'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                  <h3 className='mt-2 text-sm font-medium text-gray-900'>
                    No courses
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Get started by creating a new course.
                  </p>
                  <div className='mt-6'>
                    <Link
                      to='/create-course'
                      className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Create Course
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
