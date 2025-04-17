// src/pages/Modules/CreateModule.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { checkMilestone } from '@/src/services/milestone';
import { checkModule, deleteModule } from '@/src/services/module';
import { getCourseById } from '@/src/services/getCourse';
import ModuleForm from '../../components/CourseManagement/ModuleForm';

const CreateModule = () => {
  const { milestoneId } = useParams();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseId, setCourseId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const { fetchData } = useApi();

  const loadModules = async () => {
    setLoading(true);
    try {
      // First get the courseId from milestone
      const result_1 = await fetchData(checkMilestone, { milestoneId });
      setCourseId(result_1.data.courseId);

      // Then get the course data which includes milestones and modules
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

  useEffect(() => {
    loadModules();
  }, [milestoneId]);

  const handleAddClick = () => {
    setEditingModule(null);
    setShowForm(true);
  };

  const handleEditClick = async (moduleId) => {
    try {
      const result = await fetchData(checkModule, { moduleId });
      if (result.success) {
        setEditingModule({
          moduleId: moduleId,
          title: result.data.title,
          description: result.data.description
        });
        setShowForm(true);
      } else {
        alert('Error: Could not fetch module details');
      }
    } catch (error) {
      console.error('Error fetching module details:', error);
    }
  };

  const handleDeleteClick = async (moduleId) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      try {
        const result = await fetchData(deleteModule, { moduleId });
        if (result.success) {
          loadModules();
        } else {
          alert('Error: ' + (result.message || 'Could not delete module'));
        }
      } catch (error) {
        console.error('Error deleting module:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    loadModules();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingModule(null);
  };

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <div className='mb-8'>
        <Link
          to={`/courses/${courseId}/milestones`}
          className='text-indigo-600 hover:text-indigo-800'
        >
          &larr; Back to Milestone
        </Link>
      </div>

      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Manage Modules for Milestone</h1>
        <button
          onClick={handleAddClick}
          className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Add Module
        </button>
      </div>

      {/* Module List */}
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Modules</h2>
        {loading ? (
          <div className='text-center py-4'>Loading modules...</div>
        ) : modules.length === 0 ? (
          <div className='text-center py-4 bg-white p-6 rounded-lg shadow-md'>
            No modules found. Click "Add Module" to create your first module.
          </div>
        ) : (
          <div className='space-y-4'>
            {modules.map((module) => (
              <div
                key={module.id}
                className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'
              >
                <h3 className='text-xl font-semibold'>{module.title}</h3>
                <div className='flex space-x-2'>
                  <Link
                    to={`/content/${module.id}`}
                    className='px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                  >
                    Contents
                  </Link>
                  <button
                    onClick={() => handleEditClick(module.id)}
                    className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(module.id)}
                    className='px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className='fixed inset-0 bg-black/75 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden'>
            <div className='flex justify-between items-center px-6 py-4 bg-gray-100'>
              <h2 className='text-xl font-semibold'>
                {editingModule ? 'Edit Module' : 'Add New Module'}
              </h2>
              <button
                onClick={handleFormClose}
                className='text-gray-500 hover:text-gray-700 focus:outline-none'
              >
                ✕
              </button>
            </div>
            <div className='p-6'>
              <ModuleForm
                milestoneId={milestoneId}
                moduleId={editingModule?.moduleId}
                initialValues={editingModule}
                onSuccess={handleFormSuccess}
                isEdit={!!editingModule}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateModule;
