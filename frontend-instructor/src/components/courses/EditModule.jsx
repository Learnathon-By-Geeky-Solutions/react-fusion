// src/pages/Courses/EditModule.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import ModuleForm from '@/components/courseManagement/ModuleForm';

const EditModule = () => {
  const { courseId, milestoneId, moduleId } = useParams();
  const navigate = useNavigate();
  const { fetchData } = useApi();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const result = await fetchData(
          (params) =>
            fetch(`${process.env.BACKEND}/module/${moduleId}`, {
              headers: { Authorization: params.token }
            }).then((res) => res.json()),
          {}
        );

        if (result.success) {
          setModule(result.module);
        } else {
          setError('Could not fetch module details');
        }
      } catch (err) {
        setError('Error fetching module details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [moduleId, fetchData]);

  const handleSuccess = () => {
    navigate(`/courses/${courseId}/milestones/${milestoneId}`);
  };

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto py-8 px-4'>
        <div className='text-center'>
          <p className='text-lg'>Loading module details...</p>
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
            onClick={() =>
              navigate(`/courses/${courseId}/milestones/${milestoneId}`)
            }
            className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
          >
            Back to Milestone
          </button>
        </div>
      </div>
    );
  }

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

      <h1 className='text-3xl font-bold mb-8'>Edit Module</h1>

      {module && (
        <ModuleForm
          milestoneId={milestoneId}
          moduleId={moduleId}
          initialValues={module}
          onSuccess={handleSuccess}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default EditModule;
