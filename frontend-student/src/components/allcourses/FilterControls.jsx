import React from 'react';
import { motion } from 'framer-motion';

const FilterControls = ({
  filterType,
  filterDirection,
  onFilterToggle,
  onClearFilters
}) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {/* Price Filter Button */}
      <motion.button
        onClick={() => onFilterToggle('price')}
        className={`px-4 py-3 rounded-lg transition-colors flex items-center ${
          filterType === 'price'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className='mr-2'>Price</span>
        <svg
          className='w-5 h-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          {filterType === 'price' && filterDirection === 'asc' ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
            />
          )}
        </svg>
      </motion.button>

      {/* Rating Filter Button */}
      <motion.button
        onClick={() => onFilterToggle('rating')}
        className={`px-4 py-3 rounded-lg transition-colors flex items-center ${
          filterType === 'rating'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className='mr-2'>Rating</span>
        <svg
          className='w-5 h-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          {filterType === 'rating' && filterDirection === 'asc' ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
            />
          )}
        </svg>
      </motion.button>

      {/* Clear Filters Button - Only show when there's an active filter */}
      {filterType && (
        <motion.button
          onClick={onClearFilters}
          className='px-4 py-3 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <svg
            className='w-5 h-5 mr-1'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Clear Filters
        </motion.button>
      )}
    </div>
  );
};

export default FilterControls;
