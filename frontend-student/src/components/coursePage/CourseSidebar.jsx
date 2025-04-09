import React from 'react';
import MilestoneItem from './MilestoneItem';
import PropTypes from 'prop-types';

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
          <MilestoneItem
            key={milestone.id}
            milestone={milestone}
            mIndex={mIndex}
            openMilestones={openMilestones}
            openModules={openModules}
            toggleMilestone={toggleMilestone}
            toggleModule={toggleModule}
            handleVideoSelect={handleVideoSelect}
            selectedVideo={selectedVideo}
          />
        ))}
      </div>
    </div>
  );
}

CourseSidebar.propTypes = {
  course: PropTypes.shape({
    milestones: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string,
        modules: PropTypes.array // optional unless used directly here
      })
    ).isRequired
  }).isRequired,
  selectedVideo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  openMilestones: PropTypes.object.isRequired,
  openModules: PropTypes.object.isRequired,
  toggleMilestone: PropTypes.func.isRequired,
  toggleModule: PropTypes.func.isRequired,
  handleVideoSelect: PropTypes.func.isRequired
};