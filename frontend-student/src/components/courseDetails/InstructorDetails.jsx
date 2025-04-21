import React from 'react';

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
            <h4 className='text-xl font-semibold text-gray-900'>
              {course.instructor.name}
            </h4>
            <p className='text-blue-600 font-medium'>
              {course.instructor.designation}
            </p>
            <p className='text-gray-600 mt-1'>
              {course.instructor.currentWorkingPlace}
            </p>
            <div className='mt-3 space-y-2'>
              <div className='flex items-center'>
                <svg
                  className='w-5 h-5 text-gray-500 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                <span className='text-gray-600'>
                  Experience: {course.instructor.experience} years
                </span>
              </div>
              <div className='flex items-center'>
                <svg
                  className='w-5 h-5 text-gray-500 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                  />
                </svg>
                <span className='text-gray-600'>
                  {course.instructor.contactNumber}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
