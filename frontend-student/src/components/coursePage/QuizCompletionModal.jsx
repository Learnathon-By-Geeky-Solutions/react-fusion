import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function QuizCompletionModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Using dialog element instead of div with role="dialog"
    <dialog
      open={isOpen}
      className='fixed inset-0 flex items-center justify-center z-50 bg-transparent p-0 m-0 max-w-none max-h-none w-full h-full border-none'
      aria-labelledby='modal-title'
    >
      {/* Using button instead of div with role="button" */}
      <button
        className='fixed inset-0 bg-black bg-opacity-50 w-full h-full border-none'
        onClick={onClose}
        aria-label='Close modal'
      ></button>
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
    </dialog>
  );
}

QuizCompletionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
