import React from 'react';
import PropTypes from 'prop-types';

export default function ContentItem({
  item,
  selectedItem,
  onSelect,
  indexPath,
  itemNumber,
  quizNumber
}) {
  const isSelected = selectedItem?.id === item.id;
  const isVideo = !!item.video;
  const isQuiz = !!item.quiz;

  // Helper function to determine item title
  const getItemTitle = () => {
    if (isVideo) {
      return item.video.title;
    } else if (isQuiz) {
      return `Quiz ${quizNumber}`;
    } else {
      return `Content ${itemNumber}`;
    }
  };

  return (
    <button
      onClick={onSelect}
      className={`block w-95/100 text-left text-sm px-4 py-2 mx-2 my-1 rounded-md transition-colors ${
        isSelected
          ? 'bg-blue-500 text-white shadow-sm'
          : 'bg-gray-50 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
      }`}
    >
      <div className='flex items-center'>
        {isVideo && (
          <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M10 12a2 2 0 100-4 2 2 0 000 4z'></path>
            <path
              fillRule='evenodd'
              d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
              clipRule='evenodd'
            ></path>
          </svg>
        )}
        {isQuiz && (
          <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
            <path
              fillRule='evenodd'
              d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
              clipRule='evenodd'
            ></path>
          </svg>
        )}
        <span className='text-xs font-semibold mr-1.5'>{indexPath}</span>
        <span>{getItemTitle()}</span>
      </div>
    </button>
  );
}

ContentItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    video: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired
    }),
    quiz: PropTypes.object
  }).isRequired,
  selectedItem: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  indexPath: PropTypes.string.isRequired,
  itemNumber: PropTypes.number.isRequired,
  quizNumber: PropTypes.number
};
