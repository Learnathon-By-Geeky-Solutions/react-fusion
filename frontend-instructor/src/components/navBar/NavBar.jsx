import { Link, useLocation } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import useInstructorAuth from '@/src/context/authContext';

export default function NavBar() {
  const { instructor, logOutInstructor } = useInstructorAuth();
  const location = useLocation();

  const handleLogOut = () => {
    logOutInstructor();
    toast.success('User Logged Out');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className='w-full bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg m-0 py-4'>
      <div className='max-w-[1280px] mx-auto flex justify-between items-center px-4'>
        <Link
          to='/'
          className='text-3xl font-bold text-amber-100 uppercase tracking-wide hover:text-amber-200 transition flex items-center'
        >
          <span className='text-blue-400 mr-1'>Edu</span>Nexus
        </Link>

        <div className='flex items-center space-x-3'>
          {instructor.authenticated && (
            <>
              <Link
                to='/dashboard'
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive('/dashboard')
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                }`}
              >
                Dashboard
              </Link>

              <Link
                to='/my-courses'
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive('/my-courses')
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                }`}
              >
                My Courses
              </Link>

              <button
                onClick={handleLogOut}
                className='px-4 py-2 rounded-md text-sm font-medium transition-all bg-red-600 text-white hover:bg-red-500 shadow-sm'
              >
                Log Out
              </button>
            </>
          )}
          <Toaster position='bottom-right' richColors />
        </div>
      </div>
    </div>
  );
}
