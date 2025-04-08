import useAuth from '../../context/authContext';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

export default function NavItems() {
  const { user, logOutUser } = useAuth();
  const location = useLocation();
  const isAuthenticated = user.authenticated;

  const handleLogOut = () => {
    logOutUser();
    toast.success('User Logged Out');
  };

  // Navigation button style helper
  const getButtonStyles = (path) => {
    const isActive = location.pathname === path;
    return `${
      isActive
        ? 'bg-blue-600 text-white font-medium'
        : 'bg-transparent text-blue-600 hover:bg-blue-100'
    } py-2 px-4 rounded-md border border-blue-600 hover:border-blue-700 transition duration-200 flex items-center`;
  };

  return (
    <div className="flex items-center space-x-3">
      {isAuthenticated ? (
        // Authenticated user navigation
        <>
          <Link to="/dashboard" className={getButtonStyles('/dashboard')}>
            Dashboard
          </Link>
          
          <Link to="/my-courses" className={getButtonStyles('/my-courses')}>
            My Courses
          </Link>
          
          <Link to="/courses" className={getButtonStyles('/courses')}>
            Browse Courses
          </Link>
          
          <Link to="/profile" className={getButtonStyles('/profile')}>
            Profile
          </Link>
          
          <button
            onClick={handleLogOut}
            className="bg-red-50 text-red-600 hover:bg-red-100 py-2 px-4 rounded-md border border-red-400 hover:border-red-500 transition duration-200 flex items-center"
          >
            Log Out
          </button>
        </>
      ) : (
        // Non-authenticated user navigation
        <>
          <Link to="/" className={getButtonStyles('/')}>
            Home
          </Link>
          
          <Link to="/courses" className={getButtonStyles('/courses')}>
            Courses
          </Link>
          
          <Link to="/login" className={getButtonStyles('/login')}>
            Login
          </Link>
        </>
      )}
    </div>
  );
}