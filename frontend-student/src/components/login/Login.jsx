import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from '@/src/context/authContext';
import { authService } from '@/src/services/auth';
import { toast } from 'sonner';
import { avatar } from '@/src/assets/index';

export default function Login() {
  const { user, storeToken } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user.authenticated) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Validation schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const handleLogIn = async (data) => {
    setIsLoading(true);
    try {
      const result = await authService.logInUser(data);
      if (result.success) {
        storeToken(result.data.accessToken);
        toast.success('Login successful! Welcome back.');
      } else {
        toast.error(result.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleLogIn(values);
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex bg-gray-50 pt-17 max-w-6xl mx-auto'>
      {/* Left side decorative panel */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-500 to-blue-800 p-12 flex-col justify-between py-20'>
        <div>
          <h1 className='text-4xl font-bold text-white mb-6'>
            Welcome back to EduNexus
          </h1>
          <p className='text-blue-100 text-lg'>
            Log in to access your personalized learning journey. Discover
            courses, track your progress, and connect with educators worldwide.
          </p>
        </div>

        <div className='space-y-6'>
          <div className='flex items-start space-x-4'>
            <div className='flex-shrink-0 p-1 bg-white/10 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-white'
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
              <h3 className='text-white font-medium text-left'>
                Secure Learning Environment
              </h3>
              <p className='text-blue-100 text-sm'>
                Your data and progress are protected with our secure platform
              </p>
            </div>
          </div>

          <div className='flex items-start space-x-4'>
            <div className='flex-shrink-0 p-1 bg-white/10 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-white'
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
              <h3 className='text-white font-medium text-left'>
                Personalized Learning
              </h3>
              <p className='text-blue-100 text-sm'>
                Access your customized dashboard and course materials
              </p>
            </div>
          </div>
        </div>

        <div className='text-blue-100'>
          <p className='mb-2 font-medium text-left'>
            Trusted by learners worldwide
          </p>
          <div className='flex space-x-4'>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
              <img
                src={avatar}
                alt='Avatar'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
              <img
                src={avatar}
                alt='Avatar'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center'>
              <img
                src={avatar}
                alt='Avatar'
                className='w-full h-full object-cover rounded-full'
              />
            </div>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold'>
              +2k
            </div>
          </div>
        </div>
      </div>

      {/* Right side login form */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20'>
        <div className='max-w-md w-full space-y-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-extrabold text-gray-900'>
              Sign in to your account
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Or{' '}
              <button
                onClick={() => navigate('/signup')}
                className='font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition duration-150 ease-in-out'
              >
                create a new account
              </button>
            </p>
          </div>

          <form className='mt-8 space-y-6' onSubmit={loginFormik.handleSubmit}>
            <div className='rounded-md shadow-sm space-y-4'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Email address
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-gray-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    className={`appearance-none block w-full pl-10 pr-3 py-3 border ${
                      loginFormik.touched.email && loginFormik.errors.email
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    } rounded-lg shadow-sm`}
                    placeholder='you@example.com'
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    value={loginFormik.values.email}
                  />
                </div>
                {loginFormik.touched.email && loginFormik.errors.email && (
                  <p className='mt-1 text-sm text-red-600'>
                    {loginFormik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-gray-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                      />
                    </svg>
                  </div>
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='current-password'
                    className={`appearance-none block w-full pl-10 pr-10 py-3 border ${
                      loginFormik.touched.password &&
                      loginFormik.errors.password
                        ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    } rounded-lg shadow-sm`}
                    placeholder='••••••••'
                    onChange={loginFormik.handleChange}
                    onBlur={loginFormik.handleBlur}
                    value={loginFormik.values.password}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    onClick={togglePasswordVisibility}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5 text-gray-400 hover:text-gray-500'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      {showPassword ? (
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
                        />
                      ) : (
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      )}
                    </svg>
                  </button>
                </div>
                {loginFormik.touched.password &&
                  loginFormik.errors.password && (
                    <p className='mt-1 text-sm text-red-600'>
                      {loginFormik.errors.password}
                    </p>
                  )}
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-700'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <button
                  type='button'
                  className='font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition duration-150 ease-in-out'
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={isLoading}
                className='group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out'
              >
                {isLoading ? (
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                ) : (
                  <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                    <svg
                      className='h-5 w-5 text-blue-500 group-hover:text-blue-400'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </span>
                )}
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
