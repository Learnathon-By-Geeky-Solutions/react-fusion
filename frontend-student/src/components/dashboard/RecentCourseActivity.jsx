import React, { useEffect } from 'react';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculatePercentage, formatTime } from '@/src/utils/formatters';

export default function RecentCourseActivity({ courses, onViewDetails }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('Courses:', courses);
    console.log('OnViewDetails:', onViewDetails);
  }, [courses]);

  return (
    <div className='bg-white rounded-xl shadow-md p-6'>
      <h3 className='text-lg font-medium text-gray-700 mb-4'>
        Recent Course Activity
      </h3>
      {courses.length > 0 ? (
        <div className='space-y-4'>
          {courses.slice(0, 3).map((course, index) => {
            console.log('Course:', course);
            const courseTitle = course.courseData.courseProgress.course.title;
            const courseId = course.courseData.courseProgress.course.id;
            const summary = course.courseData?.summary;
            const totalContents =
              (summary?.totalQuizzes || 0) + (summary?.totalVideos || 0);
            const completedContents =
              (summary?.completedQuizzes || 0) +
              (summary?.completedVideos || 0);
            const displayProgress = calculatePercentage(
              completedContents,
              totalContents
            );
            return (
              <div
                key={index}
                className='border-b border-gray-100 pb-4 last:border-0 last:pb-0'
              >
                <div className='flex justify-between items-center'>
                  <div>
                    <h4 className='font-medium text-gray-800'>
                      {courseTitle || 'Untitled Course'}
                    </h4>
                    <p className='text-sm text-gray-500 mt-1 text-left'>
                      {completedContents || 0} of {totalContents || 0} contents
                      completed
                    </p>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div className='flex items-center'>
                      <Activity className='h-5 w-5 text-blue-500 mr-2' />
                      <span className='font-bold'>{displayProgress}%</span>
                    </div>
                    <button
                      onClick={() => navigate(`/analytics/${courseId}`)}
                      className='text-blue-600 hover:text-blue-800 text-sm font-medium'
                    >
                      Details
                    </button>
                  </div>
                </div>
                <div className='mt-2 w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-blue-500 h-2 rounded-full'
                    style={{ width: `${displayProgress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}

          {courses.length > 3 && (
            <div className='text-center mt-4'>
              <button
                onClick={() => navigate('/courses')}
                className='text-blue-600 hover:text-blue-800 text-sm font-medium'
              >
                View All Courses
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className='text-gray-500 text-center py-4'>
          No recent course activity found.
        </p>
      )}
    </div>
  );
}
