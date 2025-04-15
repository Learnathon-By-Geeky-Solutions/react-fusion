// src/pages/Courses/EditCourse.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import CourseForm from '@/components/courseManagement/CourseForm';

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
        // Assuming there's a getCourse service function
        const result = await fetchData(
          (params) =>
            fetch(`${process.env.BACKEND}/course/${courseId}`, {
              headers: { Authorization: params.token }
            }).then((res) => res.json()),
          {}
        );

        if (result.success) {
          setCourse(result.course);
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
  }, [courseId, fetchData]);

  const handleSuccess = () => {
    navigate(`/courses/${courseId}`);
  };

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
      <h1 className='text-3xl font-bold mb-8'>Edit Course</h1>
      {course && (
        <CourseForm
          initialValues={course}
          onSuccess={handleSuccess}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default EditCourse;
