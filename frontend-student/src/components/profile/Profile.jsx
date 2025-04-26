import React, { useEffect, useState } from 'react';
import useApi from '@/src/hooks/useApi';
import { profile } from '@/src/services/profile';
import { motion } from 'framer-motion';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await fetchData(profile, {});
        setProfileData(data.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile information. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const getQualificationDisplay = (qualification) => {
    const qualificationMap = {
      BACHELORS: "Bachelor's Degree",
      MASTERS: "Master's Degree",
      PHD: 'PhD',
      HIGHSCHOOL: 'High School',
      DIPLOMA: 'Diploma'
    };

    return qualificationMap[qualification] || qualification;
  };

  const getGenderIcon = (gender) => {
    if (gender === 'MALE') {
      return (
        <svg
          className='w-5 h-5 text-blue-600'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
      );
    } else if (gender === 'FEMALE') {
      return (
        <svg
          className='w-5 h-5 text-pink-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
      );
    } else {
      return (
        <svg
          className='w-5 h-5 text-purple-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
      );
    }
  };

  if (loading) {
    return (
      <div className='bg-gradient-to-b from-gray-50 to-white p-6 max-w-6xl mx-auto mt-20 mb-10 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-xl font-medium text-gray-700'>
            Loading profile information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-gradient-to-b from-gray-50 to-white p-6 max-w-6xl mx-auto mt-20 mb-10 min-h-screen flex items-center justify-center'>
        <div className='text-center bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-lg'>
          <svg
            className='h-12 w-12 text-red-500 mx-auto mb-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
          <h2 className='text-2xl font-bold text-red-800 mb-2'>
            Unable to Load Profile
          </h2>
          <p className='text-red-600'>{error}</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className='bg-gradient-to-b from-gray-50 to-white p-6 max-w-6xl mx-auto mt-20 mb-10 min-h-screen flex items-center justify-center'>
        <div className='text-center bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg max-w-lg'>
          <svg
            className='h-12 w-12 text-yellow-500 mx-auto mb-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
          <h2 className='text-2xl font-bold text-yellow-800 mb-2'>
            No Profile Found
          </h2>
          <p className='text-yellow-600'>
            We couldn't find your profile information. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-b from-gray-50 to-white p-6 max-w-6xl mx-auto mt-20 mb-10'>
      <motion.div
        initial='hidden'
        animate='visible'
        variants={fadeIn}
        className='mb-8'
      >
        <h1 className='text-4xl font-bold text-gray-900 mb-2'>My Profile</h1>
        <p className='text-lg text-gray-600'>
          Manage your personal information and preferences
        </p>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left column with profile picture/avatar */}
        <motion.div
          className='lg:col-span-1'
          initial='hidden'
          animate='visible'
          variants={fadeIn}
        >
          <div className='bg-white rounded-lg shadow-md p-6 text-center'>
            <div className='mx-auto mb-4'>
              {profileData.image ? (
                <img
                  src={profileData.image}
                  alt={profileData.name}
                  className='w-48 h-48 rounded-full mx-auto object-cover border-4 border-blue-100'
                />
              ) : (
                <div className='w-48 h-48 rounded-full mx-auto bg-blue-600 flex items-center justify-center text-white text-6xl font-bold'>
                  {getInitials(profileData.name)}
                </div>
              )}
            </div>

            <h2 className='text-2xl font-bold text-gray-900 mb-1'>
              {profileData.name}
            </h2>

            <div className='py-3 px-4 bg-blue-50 rounded-lg mb-4'>
              <p className='text-blue-800 flex items-center justify-center'>
                <svg
                  className='w-5 h-5 mr-2 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                {profileData.email}
              </p>
            </div>

            <div className='py-3 px-4 bg-blue-50 rounded-lg'>
              <p className='text-blue-800 flex items-center justify-center'>
                <svg
                  className='w-5 h-5 mr-2 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                  />
                </svg>
                {profileData.contactNumber}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right column with additional profile information */}
        <motion.div
          className='lg:col-span-2'
          initial='hidden'
          animate='visible'
          variants={fadeIn}
        >
          <div className='bg-white rounded-lg shadow-md p-8'>
            <h3 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
              <svg
                className='w-6 h-6 text-blue-600 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                />
              </svg>
              Personal Information
            </h3>

            <div className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label
                    htmlFor='fullName'
                    className='block text-sm font-medium text-gray-500'
                  >
                    Full Name
                  </label>
                  <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800'>
                    {profileData.name}
                  </div>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-500'
                  >
                    Email Address
                  </label>
                  <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800'>
                    {profileData.email}
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label
                    htmlFor='gender'
                    className='block text-sm font-medium text-gray-500'
                  >
                    Gender
                  </label>
                  <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800 flex items-center justify-center'>
                    {getGenderIcon(profileData.gender)}
                    <span className='ml-2'>
                      {profileData.gender.charAt(0).toUpperCase() +
                        profileData.gender.slice(1).toLowerCase()}
                    </span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='contactNumber'
                    className='block text-sm font-medium text-gray-500'
                  >
                    Contact Number
                  </label>
                  <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800'>
                    {profileData.contactNumber}
                  </div>
                </div>
              </div>
            </div>

            <hr className='my-8 border-gray-200' />

            <h3 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
              <svg
                className='w-6 h-6 text-blue-600 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                />
              </svg>
              Educational Information
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <div className='space-y-2'>
                <label
                  htmlFor='currentInstitution'
                  className='block text-sm font-medium text-gray-500'
                >
                  Current Institution
                </label>
                <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800'>
                  {profileData.currentInstitution}
                </div>
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='qualification'
                  className='block text-sm font-medium text-gray-500'
                >
                  Qualification
                </label>
                <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800'>
                  {getQualificationDisplay(profileData.qualification)}
                </div>
              </div>
            </div>

            <hr className='my-8 border-gray-200' />

            <h3 className='text-xl font-semibold text-gray-900 mb-6 flex items-center'>
              <svg
                className='w-6 h-6 text-blue-600 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              Address Information
            </h3>

            <div className='space-y-2'>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-500'
              >
                Full Address
              </label>
              <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800'>
                {profileData.address}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
