import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CourseDetailsSidebar({ course }) {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleMilestone = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
    setActiveModule(null);
  };

  const toggleModule = (id) => {
    setActiveModule(activeModule === id ? null : id);
  };

  return (
    <div className='bg-white shadow-lg rounded-lg max-h-screen'>
      <div className='p-6 bg-blue-600 text-white'>
        <h3 className='text-xl font-bold'>Course Content</h3>
      </div>
      <div className='p-4 space-y-4 max-h-[60vh] overflow-y-auto'>
        {course.milestones?.map((milestone, mIndex) => (
          <div
            key={milestone.id}
            className='border border-gray-200 rounded-lg overflow-hidden'
          >
            <div
              className='relative'
              onMouseEnter={() => setHoveredItem(`milestone-${milestone.id}`)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <button
                onClick={() => toggleMilestone(milestone.id)}
                className={`w-full text-left flex justify-between items-center p-4 ${
                  activeAccordion === milestone.id ? 'bg-blue-50' : 'bg-gray-50'
                } hover:bg-blue-50 transition-colors`}
              >
                <span className='font-medium flex items-center'>
                  <span className='bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2'>
                    {mIndex + 1}
                  </span>
                  {milestone.title}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    activeAccordion === milestone.id ? 'rotate-180' : ''
                  }`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              {/* Description tooltip on hover */}
              {hoveredItem === `milestone-${milestone.id}` &&
                milestone.description && (
                  <div className='absolute z-10 bg-gray-800 text-white text-sm p-3 rounded-md shadow-lg max-w-xs right-0 mt-2'>
                    {milestone.description}
                  </div>
                )}
            </div>

            <div
              className={`transition-all duration-300 ${
                activeAccordion === milestone.id
                  ? 'max-h-[1000px] opacity-100'
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}
            >
              <div className='p-3 space-y-3'>
                {milestone.modules?.map((module, modIndex) => (
                  <div
                    key={module.id}
                    className='border border-gray-100 rounded-md'
                  >
                    <div
                      className='relative'
                      onMouseEnter={() => setHoveredItem(`module-${module.id}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <button
                        onClick={() => toggleModule(module.id)}
                        className={`w-full text-left flex justify-between items-center p-3 ${
                          activeModule === module.id ? 'bg-blue-50' : 'bg-white'
                        } hover:bg-blue-50 transition-colors`}
                      >
                        <span className='flex items-center text-sm'>
                          <span className='text-gray-500 mr-2'>
                            {mIndex + 1}.{modIndex + 1}
                          </span>
                          {module.title}
                        </span>
                        <svg
                          className={`w-4 h-4 text-gray-500 transform transition-transform ${
                            activeModule === module.id ? 'rotate-180' : ''
                          }`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 9l-7 7-7-7'
                          />
                        </svg>
                      </button>

                      {/* Description tooltip on hover */}
                      {hoveredItem === `module-${module.id}` &&
                        module.description && (
                          <div className='absolute z-10 bg-gray-800 text-white text-sm p-3 rounded-md shadow-lg max-w-xs right-0 mt-2'>
                            {module.description}
                          </div>
                        )}
                    </div>

                    <div
                      className={`transition-all duration-300 ${
                        activeModule === module.id
                          ? 'max-h-[1000px] opacity-100'
                          : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                    >
                      <ul className='p-2 space-y-1'>
                        {module.moduleItems?.map((item, itemIndex) => (
                          <li
                            key={`${module.id}-item-${itemIndex}`}
                            className='pl-6 py-2 text-sm text-gray-700 flex items-center'
                          >
                            {item.video && (
                              <>
                                <svg
                                  className='w-4 h-4 text-blue-500 mr-2'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                                  />
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                  />
                                </svg>
                                {item.video.title}
                              </>
                            )}
                            {item.quiz && (
                              <>
                                <svg
                                  className='w-4 h-4 text-yellow-500 mr-2'
                                  fill='none'
                                  stroke='currentColor'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                  />
                                </svg>
                                Quiz {itemIndex + 1}
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CourseDetailsSidebar.propTypes = {
  course: PropTypes.shape({
    milestones: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        modules: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
              .isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            moduleItems: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                  .isRequired,
                video: PropTypes.shape({
                  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    .isRequired,
                  title: PropTypes.string.isRequired
                }),
                quiz: PropTypes.object
              })
            )
          })
        )
      })
    )
  }).isRequired
};
