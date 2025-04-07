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
    <div className='md:col-span-1 bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-200'>
      <h2 className='text-xl font-bold mb-4 text-gray-800 flex items-center'>
        <svg
          className='w-5 h-5 mr-2 text-blue-500'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z'></path>
        </svg>
        Course Content
      </h2>
      <div className='space-y-3'>
        {course.milestones.map((milestone, mIndex) => (
          <div key={milestone.id} className='mb-3'>
            {/* Milestone Toggle */}
            <button
              onClick={() => toggleMilestone(milestone.id)}
              className={`font-medium text-gray-800 px-3 py-2.5 rounded-md w-full text-left flex justify-between items-center transition-colors ${
                openMilestones[milestone.id]
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <span className='flex items-center'>
                <span className='bg-blue-500 text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 text-sm'>
                  {mIndex + 1}
                </span>
                {milestone.title}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 text-blue-500 ${
                  openMilestones[milestone.id] ? 'transform rotate-180' : ''
                }`}
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
              className={`mt-2 pl-2 transition-all duration-300 ${
                openMilestones[milestone.id]
                  ? 'max-h-full opacity-100'
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}
            >
              {milestone.modules.map((module, modIndex) => (
                <div
                  key={module.id}
                  className='bg-white rounded-md mb-2 shadow-sm border border-gray-200'
                >
                  {/* Module Toggle */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className={`text-sm font-medium px-3 py-2.5 w-full text-left flex justify-between items-center transition-colors ${
                      openModules[module.id]
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className='flex items-center'>
                      <span className='text-gray-500 mr-1.5'>
                        {mIndex + 1}.{modIndex + 1}
                      </span>
                      {module.title}
                    </span>
                    <svg
                      className={`w-3 h-3 transition-transform duration-300 text-gray-500 ${
                        openModules[module.id] ? 'transform rotate-180' : ''
                      }`}
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
                    className={`transition-all duration-300 ${
                      openModules[module.id]
                        ? 'max-h-full opacity-100 pb-2'
                        : 'max-h-0 opacity-0 overflow-hidden pb-0'
                    }`}
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
                        className={`block w-full text-left text-sm px-4 py-2 mx-2 my-1 rounded-md transition-colors ${
                          selectedVideo?.id === video.id
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'bg-gray-50 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                      >
                        <div className='flex items-center'>
                          <svg
                            className='w-4 h-4 mr-2'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M10 12a2 2 0 100-4 2 2 0 000 4z'></path>
                            <path
                              fillRule='evenodd'
                              d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                          <span className='text-xs font-semibold mr-1.5'>
                            {mIndex + 1}.{modIndex + 1}.{vIndex + 1}
                          </span>
                          <span>{video.title}</span>
                        </div>
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
