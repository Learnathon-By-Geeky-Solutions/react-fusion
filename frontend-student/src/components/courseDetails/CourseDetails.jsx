import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleCourse, buyCourse } from '@/src/services/course';
import { noimage } from '../../assets';
import useApi from '@/src/hooks/useApi';
import { nanoid } from 'nanoid';
import { motion } from 'framer-motion';
import CourseDetailsSidebar from './CourseDetailsSidebar';
import InstructorDetails from './InstructorDetails';
import { toast } from 'sonner';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const { fetchData } = useApi();

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetchData(getSingleCourse, { courseId: id });
        if (response.success) {
          setCourse(response.data);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  const handleBuyCourse = async () => {
    setPurchasing(true);

    try {
      const txnId = nanoid(16);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to purchase this course', {
          duration: 3000
        });

        navigate('/login');
        setPurchasing(false);

        return;
      }

      const purchaseData = {
        courseId: id,
        txnId
      };

      const response = await fetchData(buyCourse, purchaseData);

      if (response.success) {
        toast.success('Course purchased successfully!', {
          duration: 3000
        });

        navigate(`/enrolled/${id}`);
      } else {
        toast.error('Failed to purchase course. Please try again.', {
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Error purchasing course:', error);
      toast.error(
        'An error occurred while purchasing the course. Please try again.'
      );
    } finally {
      setPurchasing(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className='bg-gradient-to-b from-gray-50 to-white p-6 max-w-6xl mx-auto mt-20 mb-10 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-xl font-medium text-gray-700'>
            Loading course details...
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className='bg-gradient-to-b from-gray-50 to-white p-6 max-w-6xl mx-auto mt-20 mb-10 min-h-screen flex items-center justify-center'>
        <div className='text-center bg-red-50 border-l-4 border-red-500 p-6 rounded-lg'>
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
            Course Not Found
          </h2>
          <p className='text-red-600'>
            We couldn't find the course you're looking for.
          </p>
          <button
            onClick={() => navigate('/courses')}
            className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Back to Courses
          </button>
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
        className='mb-6'
      >
        <div className='flex items-center space-x-2 text-sm text-gray-600 mb-4'>
          <button
            onClick={() => navigate('/courses')}
            className='hover:text-blue-600 transition-colors flex items-center'
          >
            <svg
              className='w-4 h-4 mr-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Back to Courses
          </button>
          <span>/</span>
          <span>Course Details</span>
        </div>
      </motion.div>

      <div className='w-full grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Side: Course Details */}
        <motion.div
          className='lg:col-span-2'
          initial='hidden'
          animate='visible'
          variants={fadeIn}
        >
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            {course.title}
          </h1>

          {course.rating !== null && (
            <div className='flex items-center mb-4'>
              <div className='flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium'>
                <svg
                  className='w-4 h-4 text-yellow-300 mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
                {course.rating} / 5
              </div>
              <span className='ml-3 text-gray-500 text-sm'>
                Rated by students
              </span>
            </div>
          )}

          <div className='prose prose-blue max-w-none mb-8 p-6 bg-white rounded-lg shadow-md'>
            <p className='text-gray-700 text-lg'>{course.description}</p>
          </div>

          {/* Instructor Card - Mobile Only */}
          <div className='lg:hidden mb-8'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
              <div className='p-6 bg-blue-600 text-white'>
                <h3 className='text-xl font-bold'>Meet Your Instructor</h3>
              </div>
              <div className='p-6'>
                <div className='flex items-start'>
                  <div className='bg-blue-100 rounded-full p-3 mr-4'>
                    <svg
                      className='w-8 h-8 text-blue-600'
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
                  </div>
                  <div>
                    <h4 className='text-xl font-semibold text-gray-900'>
                      {course.instructor.name}
                    </h4>
                    <p className='text-blue-600 font-medium'>
                      {course.instructor.designation}
                    </p>
                    <p className='text-gray-600 mt-1'>
                      {course.instructor.currentWorkingPlace}
                    </p>
                    <div className='mt-3 space-y-2'>
                      <div className='flex items-center'>
                        <svg
                          className='w-5 h-5 text-gray-500 mr-2'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                          />
                        </svg>
                        <span className='text-gray-600'>
                          Experience: {course.instructor.experience} years
                        </span>
                      </div>
                      <div className='flex items-center'>
                        <svg
                          className='w-5 h-5 text-gray-500 mr-2'
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
                        <span className='text-gray-600'>
                          {course.instructor.contactNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Price Card - Mobile Only */}
          <div className='lg:hidden mb-8'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
              <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='text-2xl font-bold text-gray-900'>Price</h3>
                  <p className='text-3xl font-bold text-blue-600'>
                    $ {course.price}
                  </p>
                </div>
                <button
                  className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium text-lg disabled:bg-blue-300'
                  onClick={handleBuyCourse}
                  disabled={purchasing}
                >
                  {purchasing ? (
                    <>
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
                      Processing...
                    </>
                  ) : (
                    <>
                      Enroll Now
                      <svg
                        className='ml-2 w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M14 5l7 7m0 0l-7 7m7-7H3'
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Course Modules - Course Overview Card */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={staggerContainer}
            className='mt-8 bg-white rounded-lg shadow-md p-6'
          >
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              Course Overview
            </h2>
            <div className='space-y-4'>
              {course.milestones?.map((milestone, index) => (
                <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                  <div className='flex items-center mb-2'>
                    <span className='bg-blue-600 text-white px-2 py-1 rounded-full text-sm mr-3'>
                      {index + 1}
                    </span>
                    <h3 className='text-lg font-semibold'>{milestone.title}</h3>
                  </div>
                  {milestone.description && (
                    <p className='text-gray-600 ml-10 mb-2 text-left'>
                      {milestone.description}
                    </p>
                  )}

                  <div className='ml-10 grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-left'>
                    {milestone.modules?.map((module, moduleIndex) => (
                      <div
                        key={moduleIndex}
                        className='bg-white border border-gray-200 rounded-md p-3'
                      >
                        <p className='font-medium text-gray-800'>
                          {index + 1}.{moduleIndex + 1} {module.title}
                        </p>
                        <p className='text-sm text-gray-500 mt-1 text-justify'>
                          {module.description}
                        </p>

                        <div className='mt-2 space-y-1'>
                          {module.moduleItems?.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className='flex items-center text-sm text-gray-600 text-left'
                            >
                              {item.video ? (
                                <>
                                  <svg
                                    className='w-4 h-4 text-blue-500 mr-2'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth='2'
                                      d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                                    />
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth='2'
                                      d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                  </svg>
                                  <span className='text-left'>
                                    {item.video.title}
                                  </span>
                                </>
                              ) : item.quiz ? (
                                <>
                                  <svg
                                    className='w-4 h-4 text-yellow-500 mr-2'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth='2'
                                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                    />
                                  </svg>
                                  <span>Quiz {itemIndex + 1}</span>
                                </>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <InstructorDetails course={course} />
        </motion.div>

        {/* Right Side: Sidebar */}
        <motion.div
          className='lg:col-span-1 space-y-6'
          initial='hidden'
          animate='visible'
          variants={fadeIn}
        >
          {/* Course Thumbnail & Price */}
          <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
            <div className='relative'>
              <img
                src={course.thumbnail === 'str' ? noimage : course.thumbnail}
                alt={course.title}
                className='w-full h-60 object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end'>
                <div className='p-4 text-white'>
                  <div className='text-3xl font-bold'>$ {course.price}</div>
                </div>
              </div>
            </div>

            <div className='p-6'>
              <div className='mb-6'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center'>
                    <svg
                      className='w-5 h-5 text-blue-600 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='text-gray-700'>Lifetime Access</span>
                  </div>
                </div>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center'>
                    <svg
                      className='w-5 h-5 text-blue-600 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='text-gray-700'>Certificate Included</span>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <svg
                      className='w-5 h-5 text-blue-600 mr-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                      />
                    </svg>
                    <span className='text-gray-700'>24/7 Support</span>
                  </div>
                </div>
              </div>

              <button
                className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium text-lg disabled:bg-blue-300'
                onClick={handleBuyCourse}
                disabled={purchasing}
              >
                {purchasing ? (
                  <>
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
                    Processing...
                  </>
                ) : (
                  <>
                    Enroll Now
                    <svg
                      className='ml-2 w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M14 5l7 7m0 0l-7 7m7-7H3'
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Instructor Card - Desktop Only */}
          <CourseDetailsSidebar course={course} />
        </motion.div>
      </div>
    </div>
  );
}
