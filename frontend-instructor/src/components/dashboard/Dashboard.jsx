import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useAuth from '@/src/context/authContext';
import { noimage } from '../../assets';
import useApi from '@/src/hooks/useApi';
import { dashboardService } from '@/src/services/dashboard';

export default function CourseDashboard() {
  const { instructor, isLoading } = useAuth(); // Ensure loading is handled
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    try {
      const fetchInstructorAnalytics = async () => {
        const res = await fetchData(dashboardService.getAnalytics, {});
        setProfile(res.data);
        return res;
      };
      fetchInstructorAnalytics();
    } catch (error) {
      setError('Failed to fetch instructor analytics');
    } finally {
      setLoading(false);
    }
  }, [instructor]);

  const getThumbnail = (thumbnail) => {
    return thumbnail === 'str' ? noimage : thumbnail;
  };

  if (isLoading) {
    return <p className='text-gray-600'>Checking authentication...</p>; // Wait for auth to load
  }

  if (!instructor?.authenticated) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='p-6 max-w-[1280px] mx-auto'>
      {loading ? (
        <p className='text-gray-600'>Loading courses...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : (
        <div>
          <div className='text-3xl text-center mb-8'>
            Welcome back,{' '}
            <span className='text-5xl text-black'>Instructor</span>!
          </div>
          <div className='flex justify-between mb-4 '>
            <div className='border-2 border-gray-300 rounded-lg p-4 w-1/3'>
              Total Courses
              <h1 className='text-4xl'>{profile?.totalCourses}</h1>
            </div>
            <div className='border-2 border-gray-300 rounded-lg p-4 mx-4 w-1/3'>
              Total Students
              <h1 className='text-4xl'>{profile?.totalStudents}</h1>
            </div>
            <div className='border-2 border-gray-300 rounded-lg p-4 w-1/3'>
              Averate Rating
              <h1 className='text-4xl'>{profile?.avgRating}</h1>
            </div>
          </div>
          <div>
            <h1 className='mt-8 text-3xl font-bold'>Analytics</h1>
            <div className='flex justify-between text-xl my-4 items-center'>
              <div className='w-2/4'>Title</div>
              <div className='w-1/4'>Rating ⭐</div>
              <div className='w-1/4 pl-4'>Action</div>
            </div>
            {profile?.courses.map((item, idx) => (
              <div
                key={idx}
                className='flex justify-between text-xl mb-2 items-center'
              >
                <div className='w-2/4'>{item.title}</div>
                <div className='w-1/4'>{item.rating | '0'} </div>
                <div className='w-1/4'>
                  <Link
                    to={`/analytics/${item.id}`}
                    className='border-2 border-gray-300 px-4 py-2 rounded'
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
