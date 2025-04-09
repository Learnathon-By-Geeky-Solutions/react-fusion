import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { getDashboard, getSingleCourse } from '@/src/services/dashboard';
import { noimage } from '../../assets';

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    // Flag to prevent duplicate calls
    let isMounted = true;

    async function fetchEnrolledCourses() {
      try {
        const dashboardResponse = await fetchData(getDashboard, {});

        // Check if component is still mounted before updating state
        if (!isMounted) return;

        if (dashboardResponse.success) {
          const enrolledCoursesList =
            dashboardResponse?.data?.enrolledCourses || [];

          if (enrolledCoursesList.length === 0) {
            setLoading(false);
            return; // No enrolled courses
          }

          // Fetch details for each enrolled course
          const courseDetailsPromises = enrolledCoursesList.map((course) =>
            fetchData(getSingleCourse, course.courseId)
          );

          try {
            const courseResults = await Promise.all(courseDetailsPromises);

            // Check if component is still mounted before updating state
            if (!isMounted) return;

            // Filter successful responses and map to course details WITH progress info
            const fetchedCourses = courseResults
              .filter((result) => result.success)
              .map((result, index) => {
                // Find matching enrollment info for this course
                const enrollmentInfo = enrolledCoursesList.find(
                  (enrollment) => enrollment.courseId === result.data.id
                );

                // Merge course details with progress information
                return {
                  ...result.data,
                  progress: enrollmentInfo?.progress || 0,
                  isCompleted: enrollmentInfo?.isCompleted || false
                };
              });

            console.log('Fetched courses with progress:', fetchedCourses);
            setEnrolledCourses(fetchedCourses);
          } catch (innerErr) {
            console.error('Error fetching course details:', innerErr);
            if (isMounted) {
              setError(
                'Failed to load course details. Please try again later.'
              );
            }
          }
        }
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        if (isMounted) {
          setError('Failed to load your courses. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchEnrolledCourses();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once on mount

  const getThumbnail = (thumbnail) => {
    return thumbnail === 'str' ? noimage : thumbnail;
  };

  const renderContent = () => {
    if (loading) {
      return <p className='text-gray-600'>Loading your courses...</p>;
    }

    if (error) {
      return <p className='text-red-500'>{error}</p>;
    }

    if (enrolledCourses.length === 0) {
      return (
        <div className='text-center py-10'>
          <p className='text-gray-600 mb-4'>
            You haven't enrolled in any courses yet.
          </p>
          <Link to='/courses'>
            <button className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>
              Browse Available Courses
            </button>
          </Link>
        </div>
      );
    }

    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {enrolledCourses.map((course) => (
          <div
            key={course.id}
            className='bg-white shadow-lg rounded-lg overflow-hidden'
          >
            <div className='w-full h-60'>
              <img
                src={getThumbnail(course.thumbnail)}
                alt={course.title}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='p-4'>
              <h2 className='text-xl font-semibold'>{course.title}</h2>
              <div className='mt-2'>
                <div className='w-full bg-gray-200 rounded-full h-2.5'>
                  <div
                    className='bg-blue-600 h-2.5 rounded-full'
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className='text-sm text-gray-600 mt-1'>
                  {course.progress}% Complete
                </p>
              </div>
            </div>
            <div className='p-4 flex justify-between items-center border-t'>
              <Link to={`/courses/${course.id}`}>
                <button className='px-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition'>
                  Continue Learning
                </button>
              </Link>
              <div className='text-right'>
                {course.rating === null ? (
                  <p className='text-gray-600 flex items-center'>
                    ⭐ No Ratings
                  </p>
                ) : (
                  <p className='text-gray-600'>⭐ {course.rating} / 5</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold'>My Courses</h1>
      <p className='text-gray-600 mb-6'>
        Continue learning your enrolled courses and track your progress.
      </p>
      {renderContent()}
    </div>
  );
}
