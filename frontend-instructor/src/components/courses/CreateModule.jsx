// src/pages/Courses/CreateModule.jsx
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ModuleForm from '@/components/courseManagement/ModuleForm';

const CreateModule = () => {
  const { courseId, milestoneId } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate(`/courses/${courseId}/milestones/${milestoneId}`);
  };

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <div className='mb-8'>
        <Link
          to={`/courses/${courseId}/milestones/${milestoneId}`}
          className='text-indigo-600 hover:text-indigo-800'
        >
          &larr; Back to Milestone
        </Link>
      </div>

      <h1 className='text-3xl font-bold mb-8'>Create Module</h1>

      <ModuleForm milestoneId={milestoneId} onSuccess={handleSuccess} />
    </div>
  );
};

export default CreateModule;
