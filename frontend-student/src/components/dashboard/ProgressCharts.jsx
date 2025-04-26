import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

export default function ProgressCharts({ totalStats }) {
  const videoProgressData = [
    {
      name: 'Completed',
      value: totalStats.completedVideos,
      id: 'completed-videos'
    },
    {
      name: 'Remaining',
      value: totalStats.totalVideos - totalStats.completedVideos,
      id: 'remaining-videos'
    }
  ];

  const quizProgressData = [
    {
      name: 'Completed',
      value: totalStats.completedQuizzes,
      id: 'completed-quizzes'
    },
    {
      name: 'Remaining',
      value: totalStats.totalQuizzes - totalStats.completedQuizzes,
      id: 'remaining-quizzes'
    }
  ];

  const moduleProgressData = [
    {
      name: 'Completed',
      value: totalStats.completedModules,
      id: 'completed-modules'
    },
    {
      name: 'Remaining',
      value: totalStats.totalModules - totalStats.completedModules,
      id: 'remaining-modules'
    }
  ];

  const milestoneProgressData = [
    {
      name: 'Completed',
      value: totalStats.completedMilestones,
      id: 'completed-milestones'
    },
    {
      name: 'Remaining',
      value: totalStats.totalMilestones - totalStats.completedMilestones,
      id: 'remaining-milestones'
    }
  ];

  const COLORS = ['#4ade80', '#e2e8f0'];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
      <div className='bg-white rounded-xl shadow-md p-6'>
        <h3 className='text-lg font-medium text-gray-700 mb-4'>
          Learning Activity
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col items-center'>
            <p className='text-sm font-medium text-gray-600 mb-2'>
              Video Completion
            </p>
            <div className='h-40 w-40'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={videoProgressData}
                    cx='50%'
                    cy='50%'
                    innerRadius={36}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {videoProgressData.map((entry) => (
                      <Cell
                        key={entry.id}
                        fill={
                          entry.name === 'Completed' ? COLORS[0] : COLORS[1]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className='text-center mt-2'>
              <span className='font-bold text-xl'>
                {totalStats.totalVideos > 0
                  ? Math.round(
                      (totalStats.completedVideos / totalStats.totalVideos) *
                        100
                    )
                  : 0}
                %
              </span>
            </p>
          </div>

          <div className='flex flex-col items-center'>
            <p className='text-sm font-medium text-gray-600 mb-2'>
              Quiz Completion
            </p>
            <div className='h-40 w-40'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={quizProgressData}
                    cx='50%'
                    cy='50%'
                    innerRadius={36}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {quizProgressData.map((entry) => (
                      <Cell
                        key={entry.id}
                        fill={
                          entry.name === 'Completed' ? COLORS[0] : COLORS[1]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className='text-center mt-2'>
              <span className='font-bold text-xl'>
                {totalStats.totalQuizzes > 0
                  ? Math.round(
                      (totalStats.completedQuizzes / totalStats.totalQuizzes) *
                        100
                    )
                  : 0}
                %
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-md p-6'>
        <h3 className='text-lg font-medium text-gray-700 mb-4'>
          Course Milestones
        </h3>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col items-center'>
            <p className='text-sm font-medium text-gray-600 mb-2'>
              Module Completion
            </p>
            <div className='h-40 w-40'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={moduleProgressData}
                    cx='50%'
                    cy='50%'
                    innerRadius={36}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {moduleProgressData.map((entry) => (
                      <Cell
                        key={entry.id}
                        fill={
                          entry.name === 'Completed' ? COLORS[0] : COLORS[1]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className='text-center mt-2'>
              <span className='font-bold text-xl'>
                {totalStats.totalModules > 0
                  ? Math.round(
                      (totalStats.completedModules / totalStats.totalModules) *
                        100
                    )
                  : 0}
                %
              </span>
            </p>
          </div>

          <div className='flex flex-col items-center'>
            <p className='text-sm font-medium text-gray-600 mb-2'>
              Milestone Completion
            </p>
            <div className='h-40 w-40'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={milestoneProgressData}
                    cx='50%'
                    cy='50%'
                    innerRadius={36}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey='value'
                  >
                    {milestoneProgressData.map((entry) => (
                      <Cell
                        key={entry.id}
                        fill={
                          entry.name === 'Completed' ? COLORS[0] : COLORS[1]
                        }
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className='text-center mt-2'>
              <span className='font-bold text-xl'>
                {totalStats.totalMilestones > 0
                  ? Math.round(
                      (totalStats.completedMilestones /
                        totalStats.totalMilestones) *
                        100
                    )
                  : 0}
                %
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

ProgressCharts.propTypes = {
  totalStats: PropTypes.shape({
    completedVideos: PropTypes.number.isRequired,
    totalVideos: PropTypes.number.isRequired,
    completedQuizzes: PropTypes.number.isRequired,
    totalQuizzes: PropTypes.number.isRequired,
    completedModules: PropTypes.number.isRequired,
    totalModules: PropTypes.number.isRequired,
    completedMilestones: PropTypes.number.isRequired,
    totalMilestones: PropTypes.number.isRequired
  }).isRequired
};
