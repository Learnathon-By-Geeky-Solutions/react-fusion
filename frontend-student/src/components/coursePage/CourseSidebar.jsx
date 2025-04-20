import React from 'react';
import PropTypes from 'prop-types';
import MilestoneItem from './MilestoneItem';

export default function CourseSidebar({
  course,
  selectedItem,
  openMilestones,
  openModules,
  toggleMilestone,
  toggleModule,
  handleItemSelect
}) {
  return (
    <div className='bg-gray-50 p-4 rounded-lg shadow-lg border border-gray-200 max-h-screen overflow-y-auto'>
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
            handleItemSelect={handleItemSelect}
            selectedItem={selectedItem}
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
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string,
        modules: PropTypes.array
      })
    ).isRequired
  }).isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  openMilestones: PropTypes.object.isRequired,
  openModules: PropTypes.object.isRequired,
  toggleMilestone: PropTypes.func.isRequired,
  toggleModule: PropTypes.func.isRequired,
  handleItemSelect: PropTypes.func.isRequired
};
