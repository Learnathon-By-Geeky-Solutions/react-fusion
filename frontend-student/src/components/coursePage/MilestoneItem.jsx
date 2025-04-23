import React from 'react';
import PropTypes from 'prop-types';
import ModuleItem from './ModuleItem';

export default function MilestoneItem({
  milestone,
  mIndex,
  openMilestones,
  openModules,
  toggleMilestone,
  toggleModule,
  handleItemSelect,
  selectedItem,
  firstLockedItemId,
  currentMilestoneId,
  currentModuleId,
  unlockableItems
}) {
  const isOpen = openMilestones[milestone.id];
  const isCurrentMilestone = milestone.id === currentMilestoneId;

  return (
    <div className='mb-3'>
      <button
        onClick={() => toggleMilestone(milestone.id)}
        className={`font-medium text-gray-800 px-3 py-2.5 rounded-md w-full text-left flex justify-between items-center transition-colors ${
          isOpen ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 hover:bg-gray-300'
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
            isOpen ? 'rotate-180' : ''
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

      <div
        className={`mt-2 pl-2 transition-all duration-300 ${
          isOpen
            ? 'max-h-full opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {milestone.modules.map((module, modIndex) => (
          <ModuleItem
            key={module.id}
            module={module}
            mIndex={mIndex}
            modIndex={modIndex}
            openModules={openModules}
            toggleModule={toggleModule}
            handleItemSelect={handleItemSelect}
            selectedItem={selectedItem}
            firstLockedItemId={firstLockedItemId}
            isCurrentMilestone={isCurrentMilestone}
            isCurrentModule={module.id === currentModuleId}
            unlockableItems={unlockableItems}
          />
        ))}
      </div>
    </div>
  );
}

MilestoneItem.propTypes = {
  milestone: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string,
        moduleItems: PropTypes.array
      })
    ).isRequired
  }).isRequired,
  mIndex: PropTypes.number.isRequired,
  openMilestones: PropTypes.object.isRequired,
  openModules: PropTypes.object.isRequired,
  toggleMilestone: PropTypes.func.isRequired,
  toggleModule: PropTypes.func.isRequired,
  handleItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  firstLockedItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentMilestoneId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentModuleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unlockableItems: PropTypes.object
};
