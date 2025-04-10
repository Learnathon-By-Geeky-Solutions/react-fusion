import React from 'react';
import { useFormik } from 'formik';
import { authService } from '@/src/services/auth';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Signup() {
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    try {
      const result = await authService.signUpUser(data);
      if (result.success) {
        // Success toast notification
        alert('User Created. Please log in.');
        navigate('/login');
      } else {
        // Error toast notification
        alert('ERROR!');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  // Validation schema
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    contactNumber: Yup.string().required('Contact number is required'),
    gender: Yup.string().required('Please select your gender'),
    qualification: Yup.string().required('Please select your qualification')
  });

  const signupFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      contactNumber: '',
      currentInstitution: '',
      gender: '',
      qualification: '',
      address: ''
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    }
  });

  const inputClasses =
    'w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all';
  const labelClasses = 'block text-gray-700 font-medium mb-1';
  const errorClasses = 'text-red-500 text-sm mt-1';

  return (
    <div className='flex bg-gradient-to-br from-blue-50 to-white mt-18 max-w-6xl mx-auto'>
      {/* Left section with illustration/info */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-500 to-blue-800 text-white p-12 flex-col justify-center py-8'>
        <div>
          <h1 className='text-4xl font-bold mb-6'>Welcome to EduNexus</h1>
          <p className='text-xl opacity-90 mb-8'>
            Join our platform and transform your educational journey today.
          </p>

          <div className='space-y-6 mt-12'>
            <div className='flex items-start space-x-4'>
              <div className='bg-white bg-opacity-20 p-2 rounded-full'>
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
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-lg text-left'>
                  Personalized Learning
                </h3>
                <p className='opacity-80'>
                  Adaptive courses tailored to your unique learning style
                </p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-white bg-opacity-20 p-2 rounded-full'>
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
                    d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                  />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-lg text-left'>
                  Expert-Led Curriculum
                </h3>
                <p className='opacity-80'>
                  Learn from industry professionals and academic experts
                </p>
              </div>
            </div>

            <div className='flex items-start space-x-4'>
              <div className='bg-white bg-opacity-20 p-2 rounded-full'>
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
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <div>
                <h3 className='font-semibold text-lg text-left'>
                  Vibrant Community
                </h3>
                <p className='opacity-80'>
                  Connect with peers and mentors in your field
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='pt-8 border-t border-white border-opacity-20 mt-8'>
          <p className='opacity-80'>
            "Education is the most powerful weapon which you can use to change
            the world."
          </p>
          <p className='font-medium mt-2'>- Nelson Mandela</p>
        </div>
      </div>

      {/* Right section with form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-6 py-8'>
        <div className='w-full max-w-md p-8 bg-white shadow-xl rounded-2xl'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-800'>Create Account</h1>
            <p className='text-gray-600 mt-2'>
              Join our community of learners today
            </p>
          </div>

          <form onSubmit={signupFormik.handleSubmit} className='space-y-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <label htmlFor='name' className={labelClasses}>
                  Full Name
                </label>
                <input
                  id='name'
                  name='name'
                  placeholder='John Doe'
                  className={`${inputClasses} ${signupFormik.touched.name && signupFormik.errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.name}
                />
                {signupFormik.touched.name && signupFormik.errors.name && (
                  <div className={errorClasses}>{signupFormik.errors.name}</div>
                )}
              </div>

              <div>
                <label htmlFor='email' className={labelClasses}>
                  Email Address
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='your@email.com'
                  className={`${inputClasses} ${signupFormik.touched.email && signupFormik.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.email}
                />
                {signupFormik.touched.email && signupFormik.errors.email && (
                  <div className={errorClasses}>
                    {signupFormik.errors.email}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor='password' className={labelClasses}>
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='••••••••'
                  className={`${inputClasses} ${signupFormik.touched.password && signupFormik.errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.password}
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                </div>
              </div>
              {signupFormik.touched.password &&
                signupFormik.errors.password && (
                  <div className={errorClasses}>
                    {signupFormik.errors.password}
                  </div>
                )}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <label htmlFor='contactNumber' className={labelClasses}>
                  Contact Number
                </label>
                <input
                  id='contactNumber'
                  name='contactNumber'
                  placeholder='+1 (234) 567-8900'
                  className={`${inputClasses} ${signupFormik.touched.contactNumber && signupFormik.errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.contactNumber}
                />
                {signupFormik.touched.contactNumber &&
                  signupFormik.errors.contactNumber && (
                    <div className={errorClasses}>
                      {signupFormik.errors.contactNumber}
                    </div>
                  )}
              </div>

              <div>
                <label htmlFor='gender' className={labelClasses}>
                  Gender
                </label>
                <select
                  id='gender'
                  name='gender'
                  className={`${inputClasses} ${signupFormik.touched.gender && signupFormik.errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.gender}
                >
                  <option value=''>Select Gender</option>
                  <option value='MALE'>Male</option>
                  <option value='FEMALE'>Female</option>
                  <option value='OTHER'>Other</option>
                </select>
                {signupFormik.touched.gender && signupFormik.errors.gender && (
                  <div className={errorClasses}>
                    {signupFormik.errors.gender}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor='currentInstitution' className={labelClasses}>
                Current Institution
              </label>
              <input
                id='currentInstitution'
                name='currentInstitution'
                placeholder='University of Example'
                className={`${inputClasses} border-gray-300`}
                onChange={signupFormik.handleChange}
                value={signupFormik.values.currentInstitution}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <div>
                <label htmlFor='qualification' className={labelClasses}>
                  Qualification
                </label>
                <select
                  id='qualification'
                  name='qualification'
                  className={`${inputClasses} ${signupFormik.touched.qualification && signupFormik.errors.qualification ? 'border-red-500' : 'border-gray-300'}`}
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.qualification}
                >
                  <option value=''>Select Qualification</option>
                  <option value='HIGH_SCHOOL'>High School</option>
                  <option value='BACHELORS'>Bachelors</option>
                  <option value='MASTERS'>Masters</option>
                  <option value='PHD'>PhD</option>
                </select>
                {signupFormik.touched.qualification &&
                  signupFormik.errors.qualification && (
                    <div className={errorClasses}>
                      {signupFormik.errors.qualification}
                    </div>
                  )}
              </div>

              <div>
                <label htmlFor='address' className={labelClasses}>
                  Address
                </label>
                <input
                  id='address'
                  name='address'
                  placeholder='123 Education St'
                  className={`${inputClasses} border-gray-300`}
                  onChange={signupFormik.handleChange}
                  value={signupFormik.values.address}
                />
              </div>
            </div>

            <div className='mt-8'>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg transform hover:translate-y-px'
                disabled={signupFormik.isSubmitting}
              >
                {signupFormik.isSubmitting
                  ? 'Creating Account...'
                  : 'Create Account'}
              </button>
            </div>
          </form>

          <div className='mt-8 text-center'>
            <p className='text-gray-600'>
              Already have an account?{' '}
              <button
                className='text-blue-600 font-medium hover:text-blue-800 transition-colors'
                onClick={() => navigate('/login')}
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
