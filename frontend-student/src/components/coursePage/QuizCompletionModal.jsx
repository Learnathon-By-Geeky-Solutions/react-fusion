import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function QuizCompletionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50'
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
    >
      {/* Added keyboard listener (onKeyDown) and role attribute to the overlay */}
      <div
        className='fixed inset-0 bg-black bg-opacity-50'
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Enter' && onClose()}
        role='button'
        tabIndex={0}
        aria-label='Close modal'
      ></div>
      <div className='bg-white rounded-lg shadow-xl z-10 w-full max-w-md mx-4 overflow-hidden'>
        <div className='p-6'>
          <h3
            id='modal-title'
            className='text-lg font-medium text-gray-900 mb-4'
          >
            Complete the quiz first to continue
          </h3>
          <div className='mt-6 flex justify-end'>
            <button
              type='button'
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onClick={onClose}
            >
              Okay, I will!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

QuizCompletionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
