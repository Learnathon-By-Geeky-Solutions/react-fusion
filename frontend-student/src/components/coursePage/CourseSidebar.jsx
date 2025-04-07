import React from 'react';

export default function CourseSidebar({
  course,
  selectedVideo,
  openMilestones,
  openModules,
  toggleMilestone,
  toggleModule,
  handleVideoSelect
}) {
  return (
    <div className='md:col-span-1 bg-gray-100 p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-3 text-black'>
        Course Content
      </h2>
      <div className='space-y-2'>
        {course.milestones.map((milestone, mIndex) => (
          <div key={milestone.id} className='mb-2'>
            {/* Milestone Toggle */}
            <button
              onClick={() => toggleMilestone(milestone.id)}
              className='font-medium text-black px-2 py-2 bg-gray-300 rounded-md w-full text-left flex justify-between items-center'
            >
              <span>{milestone.title}</span>
              <svg
                className={`w-4 h-4 transition-transform ${openMilestones[milestone.id] ? 'transform rotate-180' : ''}`}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                ></path>
              </svg>
            </button>

            {/* Milestone Content */}
            <div
              className={`mt-1 ${openMilestones[milestone.id] ? 'block' : 'hidden'}`}
            >
              {milestone.modules.map((module, modIndex) => (
                <div key={module.id} className='bg-gray-200 rounded-md mb-1'>
                  {/* Module Toggle */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className='text-[14px] font-medium text-gray-800 px-4 py-2 w-full text-left flex justify-between items-center'
                  >
                    <span>{module.title}</span>
                    <svg
                      className={`w-3 h-3 transition-transform ${openModules[module.id] ? 'transform rotate-180' : ''}`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 9l-7 7-7-7'
                      ></path>
                    </svg>
                  </button>

                  {/* Module Videos */}
                  <div
                    className={`pb-2 ${openModules[module.id] ? 'block' : 'hidden'}`}
                  >
                    {module.videos.map((video, vIndex) => (
                      <button
                        key={video.id}
                        onClick={() =>
                          handleVideoSelect(
                            video,
                            mIndex + 1,
                            modIndex + 1,
                            vIndex + 1
                          )
                        }
                        className={`block w-full text-left text-sm px-6 py-2 mx-4 rounded-md ${
                          selectedVideo?.id === video.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-50 hover:bg-blue-100'
                        }`}
                      >
                        {mIndex + 1}.{modIndex + 1}.{vIndex + 1} -{' '}
                        {video.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}