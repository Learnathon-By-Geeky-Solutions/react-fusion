// src/pages/Courses/CreateMilestone.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MilestoneForm from '@/src/components/courseManagement/MilestoneForm';
import MilestoneList from '@/src/components/courseManagement/MilestoneList';

const CreateMilestone = () => {
  const { courseId } = useParams();
  const [refreshList, setRefreshList] = useState(0);

  const handleSuccess = () => {
    setRefreshList((prev) => prev + 1);
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

      <h1 className='text-3xl font-bold mb-8'>Manage Course Milestones</h1>

      <MilestoneForm courseId={courseId} onSuccess={handleSuccess} />

      <MilestoneList courseId={courseId} refreshTrigger={refreshList} />
    </div>
  );
};

export default CreateMilestone;
