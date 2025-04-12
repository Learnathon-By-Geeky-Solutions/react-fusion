import { useState, useEffect } from 'react';
import useAuth from '../../context/authContext';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import useApi from '@/src/hooks/useApi';
import { profile } from '@/src/services/profile';
import NavigationLinks from './NavigationLinks';
import UserProfile from './UserProfile';
import AuthButtons from './AuthButtons';
import Logo from './Logo';

export default function Navbar() {
  const { user, logOutUser } = useAuth();
  const location = useLocation();
  const isAuthenticated = user.authenticated;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfileData() {
      if (isAuthenticated && !profileData) {
        try {
          const data = await fetchData(profile, {});
          if (isMounted) {
            setProfileData(data.data);
          }
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      }
    }

    fetchProfileData();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, profileData, fetchData]);

  const handleLogOut = () => {
    logOutUser();
    setIsMobileMenuOpen(false);
    setProfileData(null); // Clear profile data on logout
    toast.success('User Logged Out');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className='container mx-auto px-4 max-w-6xl'>
          <div className='flex items-center justify-between'>
            <Logo isScrolled={isScrolled} location={location} />
            <NavigationLinks
              closeMobileMenu={() => setIsMobileMenuOpen(false)}
            />

            {/* Action Buttons */}
            <div className='hidden md:flex items-center space-x-4'>
              <AuthButtons
                isAuthenticated={isAuthenticated}
                handleLogOut={handleLogOut}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                isScrolled={isScrolled}
                profileData={profileData}
                user={user}
              />
            </div>

            {/* Mobile menu button */}
            <button
              className='md:hidden flex items-center'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className={`h-6 w-6 transition-colors ${isScrolled || location.pathname !== '/' ? 'text-blue-600' : 'text-white'}`}
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
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className='fixed inset-0 bg-black/50 z-40 md:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className='absolute top-0 right-0 w-80 h-full bg-white shadow-xl py-4 px-6'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
            >
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

                {isAuthenticated && (
                  <UserProfile
                    isMobile
                    profileData={profileData}
                    user={user}
                    handleLogOut={handleLogOut}
                  />
                )}

                <NavigationLinks
                  isMobile
                  closeMobileMenu={() => setIsMobileMenuOpen(false)}
                />

                <div className='mt-auto'>
                  <AuthButtons
                    isMobile
                    isAuthenticated={isAuthenticated}
                    handleLogOut={handleLogOut}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    isScrolled={isScrolled}
                    profileData={profileData}
                    user={user}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className='h-16 md:h-20'></div>
    </>
  );
}
