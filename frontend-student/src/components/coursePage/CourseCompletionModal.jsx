import React from 'react';

export default function CourseCompletionModal({ showModal, onClose }) {
  if (!showModal) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-xl p-8 max-w-md w-full transform transition-all animate-bounce-in'>
        <div className='text-center'>
          <div className='mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-16 w-16 mx-auto text-green-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
          <h3 className='text-2xl font-bold text-gray-900 mb-2'>
            Congratulations!
          </h3>
          <p className='text-gray-600 mb-6'>
            You have successfully completed the entire course!
          </p>
          <div className='flex justify-center space-x-4'>
            <button
              onClick={onClose}
              className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Thank You!
            </button>
          </div>
        </div>

        {/* Confetti Animation Elements */}
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <div className='confetti-piece bg-yellow-500 left-[10%]'></div>
          <div className='confetti-piece bg-blue-500 left-[20%]'></div>
          <div className='confetti-piece bg-red-500 left-[30%]'></div>
          <div className='confetti-piece bg-green-500 left-[40%]'></div>
          <div className='confetti-piece bg-purple-500 left-[50%]'></div>
          <div className='confetti-piece bg-pink-500 left-[60%]'></div>
          <div className='confetti-piece bg-indigo-500 left-[70%]'></div>
          <div className='confetti-piece bg-yellow-300 left-[80%]'></div>
          <div className='confetti-piece bg-blue-300 left-[90%]'></div>
          <div className='confetti-piece bg-red-300 left-[95%]'></div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 20px;
          top: -100px;
          opacity: 0;
          transform: rotate(0);
          animation: confetti-fall 5s ease-in-out infinite;
        }

        .confetti-piece:nth-child(1) {
          animation-delay: 0s;
        }
        .confetti-piece:nth-child(2) {
          animation-delay: 0.2s;
        }
        .confetti-piece:nth-child(3) {
          animation-delay: 0.4s;
        }
        .confetti-piece:nth-child(4) {
          animation-delay: 0.6s;
        }
        .confetti-piece:nth-child(5) {
          animation-delay: 0.8s;
        }
        .confetti-piece:nth-child(6) {
          animation-delay: 1s;
        }
        .confetti-piece:nth-child(7) {
          animation-delay: 1.2s;
        }
        .confetti-piece:nth-child(8) {
          animation-delay: 1.4s;
        }
        .confetti-piece:nth-child(9) {
          animation-delay: 1.6s;
        }
        .confetti-piece:nth-child(10) {
          animation-delay: 1.8s;
        }
      `}</style>
    </div>
  );
}
