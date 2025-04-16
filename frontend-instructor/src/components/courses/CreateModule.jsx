// src/pages/Modules/CreateModule.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModuleForm from '../../components/CourseManagement/ModuleForm';
import ModuleList from '../courseManagement/ModuleList';

const CreateModule = () => {
  const { milestoneId } = useParams();
  const [refreshList, setRefreshList] = useState(0);

  const handleSuccess = () => {
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <div className='mb-8'>
        <Link
          to={`/milestone/${milestoneId}`}
          className='text-indigo-600 hover:text-indigo-800'
        >
          &larr; Back to Milestone
        </Link>
      </div>

      <h1 className='text-3xl font-bold mb-8'>Create Module for Milestone</h1>

      <ModuleForm milestoneId={milestoneId} onSuccess={handleSuccess} />
      <ModuleList milestoneId={milestoneId} refreshTrigger={refreshList} />
    </div>
  );
};

export default CreateModule;
