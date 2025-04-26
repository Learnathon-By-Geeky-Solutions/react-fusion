import React from 'react';
import { BookOpen, Clock, CheckCircle, Award } from 'lucide-react';
import { formatTime } from '@/src/utils/formatters';
import PropTypes from 'prop-types';

export default function ProgressStats({ totalStats }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
      <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500'>
        <div className='flex items-center mb-2'>
          <BookOpen className='h-6 w-6 text-blue-500 mr-2' />
          <h3 className='text-lg font-medium text-gray-700'>Videos</h3>
        </div>
        <p className='text-3xl font-bold text-gray-800'>
          {totalStats.completedVideos}{' '}
          <span className='text-sm text-gray-500 font-normal'>
            / {totalStats.totalVideos}
          </span>
        </p>
        <p className='text-sm text-gray-500 mt-1'>videos completed</p>
      </div>

      <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500'>
        <div className='flex items-center mb-2'>
          <Clock className='h-6 w-6 text-green-500 mr-2' />
          <h3 className='text-lg font-medium text-gray-700'>Watch Time</h3>
        </div>
        <p className='text-3xl font-bold text-gray-800'>
          {formatTime(totalStats.userWatchTime)}
        </p>
        <p className='text-sm text-gray-500 mt-1'>
          out of {formatTime(totalStats.totalWatchTime)}
        </p>
      </div>

      <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500'>
        <div className='flex items-center mb-2'>
          <CheckCircle className='h-6 w-6 text-purple-500 mr-2' />
          <h3 className='text-lg font-medium text-gray-700'>Quizzes</h3>
        </div>
        <p className='text-3xl font-bold text-gray-800'>
          {totalStats.completedQuizzes}{' '}
          <span className='text-sm text-gray-500 font-normal'>
            / {totalStats.totalQuizzes}
          </span>
        </p>
        <p className='text-sm text-gray-500 mt-1'>quizzes completed</p>
      </div>

      <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500'>
        <div className='flex items-center mb-2'>
          <Award className='h-6 w-6 text-amber-500 mr-2' />
          <h3 className='text-lg font-medium text-gray-700'>Milestones</h3>
        </div>
        <p className='text-3xl font-bold text-gray-800'>
          {totalStats.completedMilestones}{' '}
          <span className='text-sm text-gray-500 font-normal'>
            / {totalStats.totalMilestones}
          </span>
        </p>
        <p className='text-sm text-gray-500 mt-1'>milestones achieved</p>
      </div>
    </div>
  );
}

ProgressStats.propTypes = {
  totalStats: PropTypes.shape({
    completedVideos: PropTypes.number.isRequired
  }).isRequired
};
