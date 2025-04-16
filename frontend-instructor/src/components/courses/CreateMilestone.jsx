// src/pages/Courses/CreateMilestone.jsx
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import MilestoneForm from '@/src/components/courseManagement/MilestoneForm';

const CreateMilestone = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <div className='mb-8'>
        <Link
          to={`/courses/${courseId}`}
          className='text-indigo-600 hover:text-indigo-800'
        >
          &larr; Back to Course
        </Link>
      </div>

      <h1 className='text-3xl font-bold mb-8'>Create Milestone</h1>

      <MilestoneForm courseId={courseId} onSuccess={handleSuccess} />
    </div>
  );
};

export default CreateMilestone;
