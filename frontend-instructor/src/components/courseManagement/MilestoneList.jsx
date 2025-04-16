import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { getCourseById } from '@/src/services/getCourse';

const MilestoneList = ({ courseId, refreshTrigger }) => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchData } = useApi();

  useEffect(() => {
    const loadMilestones = async () => {
      setLoading(true);
      try {
        const result = await fetchData(getCourseById, { courseId });

        if (result.success) {
          setMilestones(result.data.milestones || []);
        } else {
          console.error('Failed to load milestones:', result.message);
        }
      } catch (error) {
        console.error('Error loading milestones:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMilestones();
  }, [courseId, refreshTrigger]);

  if (loading) {
    return <div className='text-center py-4'>Loading milestones...</div>;
  }

  if (milestones.length === 0) {
    return (
      <div className='text-center py-4'>
        No milestones found. Create your first milestone above.
      </div>
    );
  }

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Course Milestones</h2>
      <div className='space-y-4'>
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'
          >
            <h3 className='text-xl font-semibold'>{milestone.title}</h3>
            <div className='flex'>
              <Link
                to={`/module/${milestone.id}`}
                className='px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
              >
                Create Module
              </Link>
              <Link
                to={`/milestone/${milestone.id}/edit`}
                className='ml-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneList;
