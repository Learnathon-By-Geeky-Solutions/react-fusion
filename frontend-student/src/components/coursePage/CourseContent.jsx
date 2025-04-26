import React from 'react';
import VideoSection from './VideoSection';
import QuizSection from './QuizSection';
import NotesSection from './NotesSection';
import CommentsSection from './CommentsSection';

export default function CourseContent({
  selectedItem,
  handleMarkCompletedAndNext,
  isCourseCompleted
}) {
  if (!selectedItem) return null;

  const renderSelectedItemTitle = () => {
    return (
      <h2 className='text-2xl font-bold mb-4 text-left'>
        {selectedItem.milestoneNumber}.{selectedItem.moduleNumber}.
        {selectedItem.itemNumber} - {selectedItem.video?.title || `Take Quiz`}
      </h2>
    );
  };

  return (
    <>
      {renderSelectedItemTitle()}
      {selectedItem.video && (
        <>
          <VideoSection
            videoId={selectedItem.video.id}
            title={selectedItem.video.title}
          />
          <div className='mt-4 mb-8'>
            <button
              onClick={handleMarkCompletedAndNext}
              className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center'
            >
              {isCourseCompleted ? 'Next' : 'Mark Completed and Next'}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          <NotesSection videoId={selectedItem.video.id} />
          <CommentsSection videoId={selectedItem.video.id} />
        </>
      )}
      {selectedItem.quiz && (
        <>
          <QuizSection quiz={selectedItem.quiz.id} />
          <div className='mt-4 mb-8'>
            <button
              onClick={handleMarkCompletedAndNext}
              className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center'
            >
              {isCourseCompleted ? 'Next' : 'Mark Completed and Next'}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 ml-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </>
  );
}
