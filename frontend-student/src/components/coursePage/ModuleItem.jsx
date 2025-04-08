import React from 'react';
import VideoItem from './VideoItem';
import PropTypes from 'prop-types';

export default function ModuleItem({
  module,
  mIndex,
  modIndex,
  openModules,
  toggleModule,
  handleVideoSelect,
  selectedVideo
}) {
  const isOpen = openModules[module.id];

  return (
    <div className='bg-white rounded-md mb-2 shadow-sm border border-gray-200'>
      <button
        onClick={() => toggleModule(module.id)}
        className={`text-sm font-medium px-3 py-2.5 w-full text-left flex justify-between items-center transition-colors ${
          isOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
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
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      <div
        className={`transition-all duration-300 ${
          isOpen ? 'max-h-full opacity-100 pb-2' : 'max-h-0 opacity-0 overflow-hidden pb-0'
        }`}
      >
        {module.videos.map((video, vIndex) => (
          <VideoItem
            key={video.id}
            video={video}
            selectedVideo={selectedVideo}
            onSelect={() => handleVideoSelect(video, mIndex + 1, modIndex + 1, vIndex + 1)}
            indexPath={`${mIndex + 1}.${modIndex + 1}.${vIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

ModuleItem.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  mIndex: PropTypes.number.isRequired,
  modIndex: PropTypes.number.isRequired,
  openModules: PropTypes.object.isRequired,
  toggleModule: PropTypes.func.isRequired,
  handleVideoSelect: PropTypes.func.isRequired,
  selectedVideo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};