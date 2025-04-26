import React from 'react';
import PropTypes from 'prop-types';

export default function DashboardSummary({ overallProgress }) {
  return (
    <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold text-gray-700'>
          Overall Learning Progress
        </h2>
        <span className='text-2xl font-bold text-blue-600'>
          {Math.round(overallProgress)}%
        </span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-4'>
        <div
          className='bg-blue-600 h-4 rounded-full transition-all duration-500'
          style={{ width: `${overallProgress}%` }}
        ></div>
      </div>
    </div>
  );
}

DashboardSummary.propTypes = {
  overallProgress: PropTypes.number.isRequired
};
