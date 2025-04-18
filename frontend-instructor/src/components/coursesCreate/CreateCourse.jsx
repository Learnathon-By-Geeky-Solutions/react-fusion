// src/pages/Courses/CreateCourse.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseForm from '@/src/components/courseManagement/CourseForm';

const CreateCourse = () => {
  const navigate = useNavigate();

  const handleSuccess = (result) => {
    if (result.success && result.data.id) {
      navigate(`/courses/${result.data.id}/milestones`);
    } else {
      navigate('/courses');
    }
  };

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <h1 className='text-3xl font-bold mb-8'>Create New Course</h1>
      <CourseForm onSuccess={handleSuccess} />
    </div>
  );
};

export default CreateCourse;
