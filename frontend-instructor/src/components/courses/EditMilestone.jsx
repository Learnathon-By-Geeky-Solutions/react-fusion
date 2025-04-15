// src/pages/Courses/EditMilestone.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import MilestoneForm from '@/components/courseManagement/MilestoneForm';

const EditMilestone = () => {
  const { courseId, milestoneId } = useParams();
  const navigate = useNavigate();
  const { fetchData } = useApi();
  const [milestone, setMilestone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMilestone = async () => {
      try {
        // Assuming there's a getMilestone service function
        const result = await fetchData(
          (params) =>
            fetch(`${process.env.BACKEND}/milestone/${milestoneId}`, {
              headers: { Authorization: params.token }
            }).then((res) => res.json()),
          {}
        );

        if (result.success) {
          setMilestone(result.milestone);
        } else {
          setError('Could not fetch milestone details');
        }
      } catch (err) {
        setError('Error fetching milestone details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestone();
  }, [milestoneId, fetchData]);

  const handleSuccess = () => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto py-8 px-4'>
        <div className='text-center'>
          <p className='text-lg'>Loading milestone details...</p>
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
            onClick={() => navigate(`/courses/${courseId}`)}
            className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

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

      <h1 className='text-3xl font-bold mb-8'>Edit Milestone</h1>

      {milestone && (
        <MilestoneForm
          courseId={courseId}
          milestoneId={milestoneId}
          initialValues={milestone}
          onSuccess={handleSuccess}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default EditMilestone;
