import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';

export default function AuthButtons({
  isMobile = false,
  isAuthenticated,
  handleLogOut,
  setIsMobileMenuOpen,
  isScrolled,
  profileData,
  user
}) {
  const location = useLocation();

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
        <UserProfile
          profileData={profileData}
          user={user}
          handleLogOut={handleLogOut}
        />
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
}

AuthButtons.propTypes = {
  isMobile: PropTypes.bool,
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  setIsMobileMenuOpen: PropTypes.func.isRequired,
  isScrolled: PropTypes.bool.isRequired,
  profileData: PropTypes.object,
  user: PropTypes.object.isRequired
};
