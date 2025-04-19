import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useAuth from '@/src/context/authContext';
import { getInstructorCourses } from '@/src/services/course';
import { noimage } from '../../assets';
import useApi from '@/src/hooks/useApi';
import { getProfile } from '@/src/services/analytics';

export default function CourseDashboard() {
  const { instructor, isLoading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetchData(getProfile, {});
        const data = await fetchData(getInstructorCourses, {
          instructorId: res.data.userId
        });

        if (data && data.data) {
          setCourses(data.data);
        }
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
    return thumbnail === 'str' || !thumbnail ? noimage : thumbnail;
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <p className='text-gray-600 text-center'>Checking authentication...</p>
      </div>
    );
  }

  if (!instructor?.authenticated) {
    return <Navigate to='/' replace />;
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className='flex justify-center items-center h-40'>
          <p className='text-gray-600 text-center'>Loading courses...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className='bg-red-50 p-4 rounded-lg'>
          <p className='text-red-500 text-center'>{error}</p>
        </div>
      );
    }

    if (courses.length === 0) {
      return (
        <div className='bg-gray-50 p-8 rounded-lg text-center'>
          <p className='text-gray-600 mb-4'>
            You haven't created any courses yet.
          </p>
          <Link to='/create-course'>
            <button className='px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition'>
              + Create Your First Course
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div className='grid gap-6 md:grid-cols-1'>
        {courses.map((course) => (
          <div
            key={course.id}
            className='bg-white shadow-md p-5 rounded-lg flex flex-col md:flex-row'
          >
            {/* Course Thumbnail */}
            <div className='md:w-48 flex-shrink-0'>
              <img
                src={getThumbnail(course.thumbnail)}
                alt={course.title}
                className='w-full h-32 md:h-40 object-cover rounded-lg'
              />
            </div>

            {/* Course Details */}
            <div className='mt-4 md:mt-0 md:ml-6 flex-1'>
              <div className='flex flex-wrap justify-between items-start'>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {course.title}
                </h3>
                <div className='flex items-center gap-2'>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      course.isPublished
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {course.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              <div className='flex flex-wrap gap-4 mt-2'>
                <p className='text-gray-700'>
                  <span className='font-medium'>Price:</span> $ {course.price}
                </p>
                <p className='text-yellow-600'>
                  <span className='font-medium'>Rating:</span>{' '}
                  {course.rating ? `${course.rating} ⭐` : 'Not rated yet'}
                </p>
              </div>

              {course.description && (
                <p className='text-gray-600 mt-2'>
                  {truncateText(course.description, 60)}
                </p>
              )}

              <div className='mt-4 flex flex-wrap gap-3'>
                <Link to={`/courses/${course.id}`}>
                  <button className='px-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition'>
                    View Details
                  </button>
                </Link>
                <Link to={`/edit-course/${course.id}`}>
                  <button className='px-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition'>
                    Edit Course
                  </button>
                </Link>
                <Link to={`/analytics/${course.id}`}>
                  <button className='px-4 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition'>
                    Analytics
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-center mb-8'>My Courses</h1>
        {/* Add Course Button */}
        <div className='text-center mt-8'>
          <Link to='/create-course'>
            <button className='px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition'>
              + Add New Course
            </button>
          </Link>
        </div>
      </div>
      {renderContent()}
    </div>
  );
}
