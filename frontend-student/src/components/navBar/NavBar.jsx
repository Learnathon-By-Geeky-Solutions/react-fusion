import { useState, useEffect } from 'react';
import useAuth from '../../context/authContext';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import useApi from '@/src/hooks/useApi';
import { profile } from '@/src/services/profile';

export default function Navbar() {
  const { user, logOutUser } = useAuth();
  const location = useLocation();
  const isAuthenticated = user.authenticated;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { fetchData } = useApi();

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch profile data when authenticated - only once
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
  }, [isAuthenticated, profileData]);

  const handleLogOut = () => {
    logOutUser();
    setIsMobileMenuOpen(false);
    setProfileData(null); // Clear profile data on logout
    toast.success('User Logged Out');
  };

  // Extracted component for navigation links
  const NavigationLinks = ({ isMobile = false, closeMobileMenu }) => {
    const renderLinks = () => {
      if (isAuthenticated) {
        return (
          <>
            <NavLink
              to='/dashboard'
              label='Dashboard'
              isMobile={isMobile}
              onClick={closeMobileMenu}
            />
            <NavLink
              to='/my-courses'
              label='My Courses'
              isMobile={isMobile}
              onClick={closeMobileMenu}
            />
            <NavLink
              to='/courses'
              label='Browse Courses'
              isMobile={isMobile}
              onClick={closeMobileMenu}
            />
            {isMobile && (
              <>
                <NavLink
                  to='/profile'
                  label='Profile'
                  isMobile={isMobile}
                  onClick={closeMobileMenu}
                />
                <NavLink
                  to='/settings'
                  label='Settings'
                  isMobile={isMobile}
                  onClick={closeMobileMenu}
                />
              </>
            )}
          </>
        );
      }

      return (
        <>
          <NavLink
            to='/'
            label='Home'
            isMobile={isMobile}
            onClick={closeMobileMenu}
          />
          <NavLink
            to='/courses'
            label='Courses'
            isMobile={isMobile}
            onClick={closeMobileMenu}
          />
          <NavLink
            to='/about'
            label='About'
            isMobile={isMobile}
            onClick={closeMobileMenu}
          />
          <NavLink
            to='/contact'
            label='Contact Us'
            isMobile={isMobile}
            onClick={closeMobileMenu}
          />
        </>
      );
    };

    return isMobile ? (
      <nav className='flex flex-col space-y-1'>{renderLinks()}</nav>
    ) : (
      <nav className='hidden md:flex items-center space-x-8'>
        {renderLinks()}
      </nav>
    );
  };

  // Extracted navigation link styling logic
  const NavLink = ({ to, label, isMobile, onClick }) => {
    const location = useLocation();

    if (isMobile) {
      const isActive = location.pathname === to;
      const mobileStyle = `w-full px-4 py-3 text-left rounded-lg transition ${
        isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-50'
      }`;

      return (
        <Link to={to} className={mobileStyle} onClick={onClick}>
          {label}
        </Link>
      );
    }

    const isActive = location.pathname === to;
    const isHomeNotScrolled = location.pathname === '/' && !isScrolled;

    const style = isActive
      ? isHomeNotScrolled
        ? 'relative text-white font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white'
        : 'relative text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600'
      : isHomeNotScrolled
        ? 'text-white hover:text-blue-100 transition'
        : 'text-gray-700 hover:text-blue-600 transition';

    return (
      <Link to={to} className={style}>
        {label}
      </Link>
    );
  };

  // User profile display component
  const UserProfile = ({ isMobile = false }) => {
    const displayName = profileData?.name || user.name || 'User';
    const email = profileData?.email || user.email || 'user@example.com';
    const initial = displayName.charAt(0).toUpperCase();
    const profileImage = profileData?.image;

    if (isMobile) {
      return (
        <div className='mb-6 flex items-center p-3 bg-gray-50 rounded-lg'>
          {profileImage ? (
            <img
              src={profileImage}
              alt={displayName}
              className='w-10 h-10 rounded-full object-cover mr-3'
            />
          ) : (
            <div className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3'>
              {initial}
            </div>
          )}
          <div>
            <div className='font-medium'>{displayName}</div>
            <div className='text-sm text-gray-500'>{email}</div>
          </div>
        </div>
      );
    }

    return (
      <div className='relative group'>
        <button className='flex items-center space-x-2 bg-gray-100 rounded-full pl-2 pr-4 py-1 hover:bg-gray-200 transition'>
          {profileImage ? (
            <img
              src={profileImage}
              alt={displayName}
              className='w-8 h-8 rounded-full object-cover'
            />
          ) : (
            <div className='w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center'>
              {initial}
            </div>
          )}
          <span className='text-gray-700'>{displayName}</span>
        </button>
        <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-10'>
          <Link
            to='/profile'
            className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
          >
            My Profile
          </Link>
          <Link
            to='/settings'
            className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
          >
            Settings
          </Link>
          <hr className='my-1' />
          <button
            onClick={handleLogOut}
            className='w-full text-left px-4 py-2 text-red-600 hover:bg-red-50'
          >
            Log Out
          </button>
        </div>
      </div>
    );
  };

  // Authentication buttons component
  const AuthButtons = ({ isMobile = false }) => {
    if (isAuthenticated) {
      return isMobile ? (
        <button
          onClick={handleLogOut}
          className='w-full py-3 text-center bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition'
        >
          Log Out
        </button>
      ) : (
        <div className='flex items-center space-x-4'>
          <UserProfile />
        </div>
      );
    }

    const desktopLinkClass = `py-2 px-4 border rounded-lg transition ${
      location.pathname === '/' && !isScrolled
        ? 'text-white border-white hover:bg-white hover:text-blue-600'
        : 'text-blue-600 border-blue-600 hover:bg-blue-50'
    }`;

    return isMobile ? (
      <div className='flex flex-col space-y-2'>
        <Link
          to='/login'
          className='w-full py-3 text-center border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition'
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Login
        </Link>
        <Link
          to='/signup'
          className='w-full py-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Sign Up
        </Link>
      </div>
    ) : (
      <div className='flex items-center space-x-3'>
        <Link to='/login' className={desktopLinkClass}>
          Login
        </Link>
        <Link
          to='/signup'
          className='py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
        >
          Sign Up
        </Link>
      </div>
    );
  };

  const Logo = () => (
    <Link to='/' className='flex items-center space-x-2'>
      <div className='w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xl font-bold'>
        E
      </div>
      <span
        className={`text-xl font-bold ${isScrolled || location.pathname !== '/' ? 'text-blue-600' : 'text-white'}`}
      >
        EduNexus
      </span>
    </Link>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className='container mx-auto px-4 max-w-6xl'>
          <div className='flex items-center justify-between'>
            <Logo />
            <NavigationLinks />

            {/* Action Buttons */}
            <div className='hidden md:flex items-center space-x-4'>
              <AuthButtons />
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

                {isAuthenticated && <UserProfile isMobile />}

                <NavigationLinks
                  isMobile
                  closeMobileMenu={() => setIsMobileMenuOpen(false)}
                />

                <div className='mt-auto'>
                  <AuthButtons isMobile />
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
