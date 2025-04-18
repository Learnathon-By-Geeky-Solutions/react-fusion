import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { deleteCourse } from '@/src/services/course';

const CourseList = ({ courses, onDelete, onRefresh }) => {
  const { fetchData } = useApi();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (courseId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this course? This action cannot be undone.'
      )
    ) {
      setIsDeleting(true);
      try {
        const params = { data: { courseId } };
        const result = await fetchData(deleteCourse, params);

        if (result.success) {
          if (onDelete) onDelete(courseId);
          if (onRefresh) onRefresh();
        } else {
          alert('Error: ' + (result.message || 'Could not delete course'));
        }
      } catch (error) {
        console.error('Error deleting course:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (!courses || courses.length === 0) {
    return (
      <div className='text-center py-10'>
        <p className='text-gray-500'>
          No courses available. Create your first course!
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {courses.map((course) => (
        <div
          key={course.id}
          className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col'
        >
          <img
            src={course.thumbnail}
            alt={course.title}
            className='w-full h-48 object-cover'
            onError={(e) => {
              e.target.src = '/placeholder-course.png';
            }}
          />
          <div className='p-4 flex-grow'>
            <h3 className='text-xl font-semibold mb-2'>{course.title}</h3>
            <p className='text-gray-600 mb-4 line-clamp-3'>
              {course.description}
            </p>
            <div className='font-bold text-indigo-600 mb-4'>
              ${course.price.toFixed(2)}
            </div>
          </div>
          <div className='px-4 pb-4 flex justify-between'>
            <Link
              to={`/courses/${course.id}`}
              className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
            >
              View Details
            </Link>
            <div className='flex gap-2'>
              <Link
                to={`/courses/edit/${course.id}`}
                className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(course.id)}
                disabled={isDeleting}
                className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
