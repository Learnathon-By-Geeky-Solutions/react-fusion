import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import ModuleForm from '@/components/courseManagement/ModuleForm';
import { deleteModule } from '@/src/services/module';

const MilestoneDetail = () => {
  const { courseId, milestoneId } = useParams();
  const navigate = useNavigate();
  const { fetchData } = useApi();
  const [milestone, setMilestone] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModuleForm, setShowModuleForm] = useState(false);

  useEffect(() => {
    const fetchMilestoneDetails = async () => {
      try {
        const milestoneResult = await fetchData(
          (params) =>
            fetch(`${process.env.BACKEND}/milestone/${milestoneId}`, {
              headers: { Authorization: params.token }
            }).then((res) => res.json()),
          {}
        );

        if (milestoneResult.success) {
          setMilestone(milestoneResult.milestone);
        } else {
          setError('Could not fetch milestone details');
        }

        const modulesResult = await fetchData(
          (params) =>
            fetch(`${process.env.BACKEND}/milestone/${milestoneId}/modules`, {
              headers: { Authorization: params.token }
            }).then((res) => res.json()),
          {}
        );

        if (modulesResult.success) {
          setModules(modulesResult.modules || []);
        } else {
          console.error('Could not fetch modules');
        }
      } catch (err) {
        setError('Error fetching milestone data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMilestoneDetails();
  }, [milestoneId, fetchData]);

  const handleAddModule = (result) => {
    if (result.success && result.module) {
      setModules([...modules, result.module]);
      setShowModuleForm(false);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this module? This action cannot be undone.'
      )
    ) {
      try {
        const params = { data: { moduleId } };
        const result = await fetchData(deleteModule, params);

        if (result.success) {
          setModules(modules.filter((m) => m.id !== moduleId));
        } else {
          alert('Error: ' + (result.message || 'Could not delete module'));
        }
      } catch (error) {
        console.error('Error deleting module:', error);
      }
    }
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

      {milestone && (
        <div className='mb-12'>
          <div className='flex justify-between items-start mb-6'>
            <h1 className='text-3xl font-bold'>{milestone.title}</h1>
            <Link
              to={`/courses/${courseId}/milestones/${milestoneId}/edit`}
              className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'
            >
              Edit Milestone
            </Link>
          </div>

          <div className='bg-white shadow-md rounded-lg p-6 mb-8'>
            <p className='text-gray-600'>{milestone.description}</p>
          </div>
        </div>
      )}

      <div className='mb-8'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-semibold'>Modules</h2>
          <button
            onClick={() => setShowModuleForm(!showModuleForm)}
            className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
          >
            {showModuleForm ? 'Cancel' : 'Add Module'}
          </button>
        </div>

        {showModuleForm && (
          <div className='mb-8'>
            <ModuleForm milestoneId={milestoneId} onSuccess={handleAddModule} />
          </div>
        )}

        {modules.length === 0 ? (
          <div className='bg-white shadow-md rounded-lg p-6 text-center'>
            <p className='text-gray-500'>
              No modules added yet. Add your first module to create content for
              this milestone.
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {modules.map((module, index) => (
              <div
                key={module.id}
                className='bg-white shadow-md rounded-lg overflow-hidden'
              >
                <div className='p-6'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='text-xl font-semibold mb-2'>
                        {index + 1}. {module.title}
                      </h3>
                      <p className='text-gray-600'>{module.description}</p>
                    </div>
                    <div className='flex space-x-2'>
                      <Link
                        to={`/courses/${courseId}/milestones/${milestoneId}/modules/${module.id}`}
                        className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                      >
                        Manage Content
                      </Link>
                      <Link
                        to={`/courses/${courseId}/milestones/${milestoneId}/modules/${module.id}/edit`}
                        className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteModule(module.id)}
                        className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MilestoneDetail;
