import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function ProgressCharts({ totalStats }) {
  // Data for the progress charts
  const videoProgressData = [
    { name: 'Completed', value: totalStats.completedVideos },
    {
      name: 'Remaining',
      value: totalStats.totalVideos - totalStats.completedVideos
    }
  ];

  const quizProgressData = [
    { name: 'Completed', value: totalStats.completedQuizzes },
    {
      name: 'Remaining',
      value: totalStats.totalQuizzes - totalStats.completedQuizzes
    }
  ];

  const moduleProgressData = [
    { name: 'Completed', value: totalStats.completedModules },
    {
      name: 'Remaining',
      value: totalStats.totalModules - totalStats.completedModules
    }
  ];

  const milestoneProgressData = [
    { name: 'Completed', value: totalStats.completedMilestones },
    {
      name: 'Remaining',
      value: totalStats.totalMilestones - totalStats.completedMilestones
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
                    {videoProgressData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
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
                    {quizProgressData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
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
                    {moduleProgressData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
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
                    {milestoneProgressData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
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
