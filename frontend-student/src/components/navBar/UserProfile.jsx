import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function UserProfile({
  isMobile = false,
  profileData,
  user,
  handleLogOut
}) {
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
      <div className='absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-10'>
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
          className='w-full px-4 py-2 text-red-600 hover:bg-red-50'
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  isMobile: PropTypes.bool,
  profileData: PropTypes.object,
  user: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired
};
