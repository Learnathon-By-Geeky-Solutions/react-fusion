import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getQuiz } from '@/src/services/quiz';
import { checkVideo } from '@/src/services/video';
import useApi from '@/src/hooks/useApi';

export default function ContentItem({
  item,
  selectedItem,
  onSelect,
  indexPath,
  itemNumber,
  quizNumber,
  isFirstLockedItem = false,
  isLocked = false
}) {
  const isSelected = selectedItem?.id === item.id;
  const isVideo = !!item.video;
  const isQuiz = !!item.quiz;
  const { fetchData } = useApi();
  const [locked, setLocked] = useState(isLocked);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchContentData = async () => {
      let contentTitle = '';
      let itemLocked = isLocked;

      if (isVideo) {
        const video_data = await fetchData(checkVideo, {
          videoId: item.video.id
        });
        contentTitle = item.video.title;
        itemLocked = video_data?.data?.progress === null && !isFirstLockedItem;
      } else if (isQuiz) {
        const quiz_data = await fetchData(getQuiz, {
          quizId: item.quiz.id
        });
        contentTitle = `Quiz ${quizNumber}`;
        itemLocked = quiz_data?.data?.progress === null && !isFirstLockedItem;
      } else {
        contentTitle = `Content ${itemNumber}`;
      }

      setTitle(contentTitle);
      setLocked(itemLocked);
    };

    fetchContentData();
  }, [
    isVideo,
    isQuiz,
    item,
    quizNumber,
    itemNumber,
    isFirstLockedItem,
    isLocked
  ]);

  // Extract the nested ternary into a separate variable
  const buttonClassName = `block w-95/100 text-left text-sm px-4 py-2 mx-2 my-1 rounded-md transition-colors ${
    locked
      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
      : isSelected
        ? 'bg-blue-500 text-white shadow-sm'
        : 'bg-gray-50 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
  }`;

  return (
    <button
      onClick={locked ? undefined : onSelect}
      disabled={locked}
      className={buttonClassName}
      title={locked ? 'Complete previous courses first' : ''}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          {isVideo && (
            <svg
              className='w-4 h-4 mr-2'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M10 12a2 2 0 100-4 2 2 0 000 4z'></path>
              <path
                fillRule='evenodd'
                d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          )}
          {isQuiz && (
            <svg
              className='w-4 h-4 mr-2'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
              <path
                fillRule='evenodd'
                d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                clipRule='evenodd'
              ></path>
            </svg>
          )}
          <span className='text-xs font-semibold mr-1.5'>{indexPath}</span>
          <span>{title}</span>
        </div>

        {locked && (
          <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
              clipRule='evenodd'
            ></path>
          </svg>
        )}
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
  quizNumber: PropTypes.number,
  isFirstLockedItem: PropTypes.bool,
  isLocked: PropTypes.bool
};
