import React from 'react';
import PropTypes from 'prop-types';

export default function CourseDetailsSidebar({ course }) {
  if (!course || !course.instructor) {
    return null;
  }

  return (
    <div className='hidden lg:block bg-white shadow-lg rounded-lg overflow-hidden'>
      <div className='p-6 bg-blue-600 text-white'>
        <h3 className='text-xl font-bold'>Meet Your Instructor</h3>
      </div>
      <div className='p-6'>
        <div className='flex items-start'>
          <div className='bg-blue-100 rounded-full p-3 mr-4'>
            <svg
              className='w-8 h-8 text-blue-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </div>
          <div>
            <h4 className='text-xl font-semibold text-gray-900 text-left'>
              {course.instructor.name}
            </h4>
            <p className='text-blue-600 font-medium text-left'>
              {course.instructor.designation}
            </p>
            <p className='text-gray-600 mt-1 text-left'>
              {course.instructor.currentWorkingPlace}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

CourseDetailsSidebar.propTypes = {
  course: PropTypes.shape({
    instructor: PropTypes.shape({
      name: PropTypes.string.isRequired,
      designation: PropTypes.string.isRequired,
      currentWorkingPlace: PropTypes.string.isRequired
    }).isRequired
  })
};
