import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getSingleCourse from '@/src/services/singleCourse';
import { buyCourse } from '@/src/services/buyCourse';
import { noimage } from '../../assets';
import useApi from '@/src/hooks/useApi';
import { nanoid } from 'nanoid';

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
        const payload = { id };
        const response = await fetchData(getSingleCourse, payload);

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
        alert('Please login to purchase this course');
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
        alert('Course purchased successfully!');
        navigate(`/enrolled/${id}`);
      } else {
        alert(
          response.message || 'Failed to purchase course. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error purchasing course:', error);
      alert('An error occurred while purchasing the course. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading)
    return <p className='text-center text-lg'>Loading course details...</p>;
  if (!course)
    return <p className='text-center text-red-500'>Course not found.</p>;

  return (
    <div className='max-w-[1280px] mx-auto'>
      <div className='w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 py-8'>
        {/* Left Side: Course Details */}
        <div className='md:col-span-2'>
          <h1 className='text-3xl font-bold text-gray-900'>{course.title}</h1>
          <p className='text-gray-700 mt-4 text-left'>{course.description}</p>

          {/* Course Modules */}
          <div className='mt-6'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              Course Content
            </h2>
            <div className='mt-4 space-y-2'>
              {course.milestones.map((milestone) => (
                <details
                  key={milestone.id}
                  className='bg-gray-300 rounded-lg p-3 cursor-pointer'
                >
                  <summary className='font-semibold text-lg'>
                    {milestone.title}
                  </summary>
                  <div className='ml-4 mt-2 space-y-2'>
                    {milestone.modules.map((module) => (
                      <details
                        key={module.id}
                        className='bg-gray-100 p-3 rounded-lg cursor-pointer'
                      >
                        <summary className='text-lg font-semibold'>
                          {module.title}
                        </summary>
                        <div className='ml-4 mt-2 space-y-2'>
                          {module.videos.map((video, index) => (
                            <div
                              key={video.id}
                              className='bg-gray-200 py-2 px-4 rounded-md'
                            >
                              Video {index + 1}: {video.title}
                            </div>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Thumbnail, Pricing & Instructor Info */}
        <div className='md:col-span-1 p-6 bg-white shadow-lg rounded-lg'>
          <img
            src={course.thumbnail === 'str' ? noimage : course.thumbnail}
            alt={course.title}
            className='w-full h-60 object-cover rounded-lg'
          />
          <div className='mt-4 flex items-center justify-between'>
            <p className='text-lg font-semibold text-gray-900'>
              {course.rating === null
                ? '⭐ No Ratings'
                : `⭐ ${course.rating} / 5`}
            </p>
            <p className='text-xl font-bold text-blue-500'>৳ {course.price}</p>
          </div>

          {/* Instructor Info */}
          <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
            <h2 className='text-lg font-semibold'>{course.instructor.name}</h2>
            <p className='text-sm text-gray-600'>
              {course.instructor.designation}
            </p>
            <p className='text-sm text-gray-500'>
              {course.instructor.currentWorkingPlace}
            </p>
            <p className='text-sm text-gray-500'>
              Experience: {course.instructor.experience} years
            </p>
            <p className='text-sm text-gray-500'>
              Contact: {course.instructor.contactNumber}
            </p>
          </div>

          <button
            className='w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300'
            onClick={handleBuyCourse}
            disabled={purchasing}
          >
            {purchasing ? 'Processing...' : 'Buy This Course'}
          </button>
        </div>
      </div>
    </div>
  );
}
