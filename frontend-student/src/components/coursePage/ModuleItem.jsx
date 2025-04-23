import React from 'react';
import PropTypes from 'prop-types';
import ContentItem from './ContentItem';

export default function ModuleItem({
  module,
  mIndex,
  modIndex,
  openModules,
  toggleModule,
  handleItemSelect,
  selectedItem,
  firstLockedItemId,
  isCurrentMilestone,
  isCurrentModule,
  unlockableItems
}) {
  const isOpen = openModules[module.id];
  let quizCount = 0;

  return (
    <div className='bg-white rounded-md mb-2 shadow-sm border border-gray-200'>
      <button
        onClick={() => toggleModule(module.id)}
        className={`text-sm font-medium px-3 py-2.5 w-full text-left flex justify-between items-center transition-colors ${
          isOpen
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
        className={`transition-all duration-300 ${
          isOpen
            ? 'max-h-full opacity-100 pb-2'
            : 'max-h-0 opacity-0 overflow-hidden pb-0'
        }`}
      >
        {module.moduleItems?.map((item, itemIndex) => {
          if (item.quiz) {
            quizCount++;
          }

          // Determine if the item should be unlocked
          // It's unlocked if:
          // 1. It's in a previous milestone compared to current milestone
          // 2. It's in a previous module within the current milestone
          // 3. It's in the current module and in the unlockableItems list

          const isPreviousMilestone =
            !isCurrentMilestone &&
            mIndex < parseInt(selectedItem?.milestoneNumber || 0) - 1;
          const isPreviousModule =
            isCurrentMilestone &&
            !isCurrentModule &&
            modIndex < parseInt(selectedItem?.moduleNumber || 0) - 1;
          const isUnlockableItem =
            isCurrentModule && unlockableItems && unlockableItems[item.id];

          const isUnlocked =
            isPreviousMilestone || isPreviousModule || isUnlockableItem;
          const isFirstLocked = item.id === firstLockedItemId;

          return (
            <ContentItem
              key={item.id}
              item={item}
              selectedItem={selectedItem}
              onSelect={() =>
                handleItemSelect(item, mIndex + 1, modIndex + 1, itemIndex + 1)
              }
              indexPath={`${mIndex + 1}.${modIndex + 1}.${itemIndex + 1}`}
              itemNumber={itemIndex + 1}
              quizNumber={item.quiz ? quizCount : undefined}
              isFirstLockedItem={isFirstLocked}
              isLocked={!isUnlocked && !isFirstLocked}
            />
          );
        })}
      </div>
    </div>
  );
}

ModuleItem.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    moduleItems: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        video: PropTypes.object,
        quiz: PropTypes.object
      })
    ).isRequired
  }).isRequired,
  mIndex: PropTypes.number.isRequired,
  modIndex: PropTypes.number.isRequired,
  openModules: PropTypes.object.isRequired,
  toggleModule: PropTypes.func.isRequired,
  handleItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object,
  firstLockedItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isCurrentMilestone: PropTypes.bool,
  isCurrentModule: PropTypes.bool,
  unlockableItems: PropTypes.object
};
