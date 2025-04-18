import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import useInstructorAuth from '@/src/context/authContext';

export default function NavBar() {
  const { instructor, logOutInstructor } = useInstructorAuth();
  const location = useLocation();
  const isAuthenticated = instructor.authenticated;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOutInstructor();
    setIsMobileMenuOpen(false);
    toast.success('User Logged Out');
  };

  return (
    <>
      <div className='bg-white shadow-md py-4 w-full'>
        <div className='container mx-auto max-w-6xl '>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link to='/' className='flex items-center space-x-2'>
              <div className='w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg font-bold'>
                E
              </div>
              <span
                className={`text-lg font-bold ${
                  isScrolled || location.pathname !== '/'
                    ? 'text-blue-600'
                    : 'text-blue-600'
                }`}
              >
                EduNexus
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className='hidden md:flex items-center space-x-4'>
              {isAuthenticated && (
                <>
                  <Link
                    to='/dashboard'
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      location.pathname === '/dashboard'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to='/my-courses'
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      location.pathname === '/my-courses'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    My Courses
                  </Link>

                  <button
                    onClick={handleLogOut}
                    className='px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-500 shadow-sm'
                  >
                    Log Out
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Link
                    to='/signup'
                    className='px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className='md:hidden flex items-center'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 transition-colors text-blue-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='fixed inset-0 bg-black/50 z-40 md:hidden'>
          <div className='absolute top-0 right-0 w-80 h-full bg-white shadow-xl py-4 px-6'>
            <div className='flex flex-col h-full'>
              <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg font-bold'>
                    E
                  </div>
                  <span className='text-lg font-bold text-blue-600'>
                    EduNexus
                  </span>
                </div>
                <button
                  className='text-gray-500 hover:text-gray-700'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className='flex flex-col space-y-3 mt-6'>
                {isAuthenticated && (
                  <>
                    <Link
                      to='/dashboard'
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        location.pathname === '/dashboard'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to='/my-courses'
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        location.pathname === '/my-courses'
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Courses
                    </Link>
                    <button
                      onClick={handleLogOut}
                      className='px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-500 mt-4'
                    >
                      Log Out
                    </button>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <Link
                      to='/login'
                      className='px-4 py-2 rounded-md text-sm font-medium border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to='/register'
                      className='px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700'
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toaster for notifications */}
      <Toaster position='bottom-right' richColors />
    </>
  );
}
