// src/components/CourseManagement/ModuleList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { getCourseById } from '@/src/services/getCourse';
import { checkMilestone } from '@/src/services/milestone';

const ModuleList = ({ refreshTrigger, milestoneId }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchData } = useApi();

  useEffect(() => {
    const loadModules = async () => {
      setLoading(true);
      try {
        const result_1 = await fetchData(checkMilestone, { milestoneId });
        const result = await fetchData(getCourseById, {
          courseId: result_1.data.courseId
        });

        if (result.success) {
          // Find the specific milestone in the course data
          const milestone = result.data.milestones.find(
            (m) => m.id === milestoneId
          );

          if (milestone) {
            setModules(milestone.modules || []);
          } else {
            console.error('Milestone not found in course data');
            setModules([]);
          }
        } else {
          console.error('Failed to load course data:', result.message);
        }
      } catch (error) {
        console.error('Error loading modules:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, [refreshTrigger, milestoneId]);

  if (loading) {
    return <div className='text-center py-4'>Loading modules...</div>;
  }

  if (modules.length === 0) {
    return (
      <div className='text-center py-4'>
        No modules found. Create your first module above.
      </div>
    );
  }

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Modules</h2>
      <div className='space-y-4'>
        {modules.map((module) => (
          <div
            key={module.id}
            className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'
          >
            <h3 className='text-xl font-semibold'>{module.title}</h3>
            <div className='flex'>
              <Link
                to={`/content/${module.id}`}
                className='px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
              >
                Add Content
              </Link>
              <Link
                to={`/module/${module.id}/edit`}
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

export default ModuleList;
