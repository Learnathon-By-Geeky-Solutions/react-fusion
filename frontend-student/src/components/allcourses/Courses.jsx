import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '@/src/services/course';
import { noimage } from '../../assets';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getAllCourses();
        setCourses(data.data);
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

  const renderContent = () => {
    if (loading) {
      return <p className='text-gray-600'>Loading courses...</p>;
    }

    if (error) {
      return <p className='text-red-500'>{error}</p>;
    }

    return (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {courses.map((course) => (
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
            </div>
            <div className='p-4 flex justify-between items-center border-t'>
              <Link to={`/courses/${course.id}`}>
                <button className='px-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition'>
                  View Details
                </button>
              </Link>
              <div className='text-right'>
                <p className='text-lg font-bold text-blue-500'>
                  ৳ {course.price}
                </p>
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
    <div className='p-6 max-w-[1280px] mx-auto'>
      <h1 className='text-3xl font-bold'>All Courses</h1>
      <p className='text-gray-600 mb-6'>
        Explore our wide range of courses to boost your skills and career.
      </p>
      {renderContent()}
    </div>
  );
}
