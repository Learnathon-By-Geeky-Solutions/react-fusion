import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import CourseForm from '@/src/components/courseManagement/CourseForm';
import { getSingleCourse } from '@/src/services/course';

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { fetchData } = useApi();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await fetchData(getSingleCourse, { courseId });
        if (result.success) {
          setCourse({
            title: result.data.title,
            description: result.data.description,
            price: result.data.price,
            thumbnail: result.data.thumbnail
          });
        } else {
          setError('Could not fetch course details');
        }
      } catch (err) {
        setError('Error fetching course details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto py-8 px-4'>
        <div className='text-center'>
          <p className='text-lg'>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-6xl mx-auto py-8 px-4'>
        <div className='text-center text-red-600'>
          <p className='text-lg'>{error}</p>
          <button
            onClick={() => navigate('/courses')}
            className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      {course && <CourseForm initialValues={course} isEdit={true} />}
      <div className='mt-6 flex justify-between'>
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className='flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition'
        >
          <span className='mr-2'>&larr;</span> Back to Course
        </button>

        <button
          onClick={() => navigate(`/courses/${courseId}/milestones`)}
          className='flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
        >
          Edit Milestones <span className='ml-2'>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default EditCourse;
