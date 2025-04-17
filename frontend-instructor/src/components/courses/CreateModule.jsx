// src/pages/Modules/CreateModule.jsx
import React, { useState, useEffect, use } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModuleForm from '../../components/CourseManagement/ModuleForm';
import ModuleList from '../courseManagement/ModuleList';
import useApi from '@/src/hooks/useApi';
import { checkMilestone } from '@/src/services/milestone';

const CreateModule = () => {
  const { milestoneId } = useParams();
  const [refreshList, setRefreshList] = useState(0);
  const { fetchData } = useApi();
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    const loadCourseId = async () => {
      try {
        const result = await fetchData(checkMilestone, { milestoneId });
        setCourseId(result.data.courseId);
        console.log('Course ID:', result.data.courseId);
      } catch (error) {
        console.error('Error loading courseId:', error);
      }
    };
    loadCourseId();
  }, []);

  const handleSuccess = () => {
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <div className='mb-8'>
        <Link
          to={`/courses/${courseId}/milestones`} ///courses/:courseId/milestones
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
