import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useAuth from '@/src/context/authContext';
import { getCourseById } from '@/src/services/getCourse';
import { dashboardService } from '@/src/services/dashboard';
import { noimage } from '../../assets';
import useApi from '@/src/hooks/useApi';

export default function CourseDashboard() {
  const { instructor, isLoading } = useAuth(); // Authentication check
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetchData(dashboardService.getAnalytics, {});
        const data = await fetchData(getCourseById, {});
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const getThumbnail = (thumbnail) => {
    return thumbnail === 'str' ? noimage : thumbnail;
  };

  if (isLoading) {
    return (
      <p className='text-gray-600 text-center'>Checking authentication...</p>
    ); // Wait for auth to load
  }

  if (!instructor?.authenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='p-6 max-w-[1280px] mx-auto'>
      <h1 className='text-3xl font-bold text-center'>All Courses</h1>

      {loading ? (
        <p className='text-gray-600 text-center'>Loading courses...</p>
      ) : error ? (
        <p className='text-red-500 text-center'>{error}</p>
      ) : (
        <>
          <div className='space-y-4'>
            {courses.map((course) => (
              <div
                key={course.id}
                className='flex bg-white shadow-md p-4 rounded-lg items-center'
              >
                {/* Course Thumbnail */}
                <img
                  src={getThumbnail(course.thumbnail)}
                  alt={course.title}
                  className='w-32 h-20 object-cover rounded-lg'
                />

                {/* Course Details */}
                <div className='ml-4 flex-1'>
                  <h3 className='text-lg font-semibold'>{course.title}</h3>
                  <p className='text-gray-600'>
                    Instructor: {course.instructor?.name || 'Unknown'}
                  </p>
                  <p className='text-yellow-500'>
                    Rating: {course.rating ?? 'N/A'} ⭐
                  </p>
                  <p className='text-lg font-bold text-blue-500'>
                    ৳ {course.price}
                  </p>

                  <div className='mt-2 flex gap-3'>
                    <Link to={`/courses/${course.id}`}>
                      <button className='px-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition'>
                        View Details
                      </button>
                    </Link>
                    <button className='px-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition'>
                      Edit
                    </button>
                    <Link to={`/analytics/${course.id}`}>
                      <button className='px-4 bg-red-500 text-white py-2 rounded-lg hover:bg-blue-600 transition'>
                        Analytics
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Course Button */}
          <div className='text-center mt-6'>
            <Link to='/create-course'>
              <button className='px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition'>
                + Add Course
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
