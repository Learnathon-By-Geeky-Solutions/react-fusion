import React from 'react';

export default function VideoItem({ video, selectedVideo, onSelect, indexPath }) {
  const isSelected = selectedVideo?.id === video.id;

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
        <span className='text-xs font-semibold mr-1.5'>{indexPath}</span>
        <span>{video.title}</span>
      </div>
    </button>
  );
}
