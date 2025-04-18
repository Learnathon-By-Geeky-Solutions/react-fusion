// src/pages/Courses/CreateMilestone.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { getCourseById } from '@/src/services/getCourse';
import { deleteMilestone } from '@/src/services/milestone';
import MilestoneForm from '@/src/components/courseManagement/MilestoneForm';

const CreateMilestone = () => {
  const { courseId } = useParams();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const { fetchData } = useApi();

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

  useEffect(() => {
    loadMilestones();
  }, [courseId]);

  const handleAddClick = () => {
    setEditingMilestone(null);
    setShowForm(true);
  };

  const handleEditClick = (milestone) => {
    setEditingMilestone({
      milestoneId: milestone.id,
      title: milestone.title,
      description: milestone.description
    });
    setShowForm(true);
  };

  const handleDeleteClick = async (milestoneId) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      try {
        const result = await fetchData(deleteMilestone, { milestoneId });
        if (result.success) {
          loadMilestones();
        } else {
          alert('Error: ' + (result.message || 'Could not delete milestone'));
        }
      } catch (error) {
        console.error('Error deleting milestone:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    loadMilestones();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMilestone(null);
  };

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <div className='flex justify-between mb-8'>
        <Link
          to={`/edit-course/${courseId}`}
          className='text-indigo-600 hover:text-indigo-800'
        >
          &larr; Back to Course
        </Link>
        <Link
          to={`/courses/${courseId}`}
          className='text-indigo-600 hover:text-indigo-800'
        >
          Preview and Submit &rarr;
        </Link>
      </div>

      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>Manage Course Milestones</h1>
        <button
          onClick={handleAddClick}
          className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Add Milestone
        </button>
      </div>

      {/* Milestone List */}
      <div className='mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Course Milestones</h2>
        {loading ? (
          <div className='text-center py-4'>Loading milestones...</div>
        ) : milestones.length === 0 ? (
          <div className='text-center py-4 bg-white p-6 rounded-lg shadow-md'>
            No milestones found. Click "Add Milestone" to create your first
            milestone.
          </div>
        ) : (
          <div className='space-y-4'>
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'
              >
                <div>
                  <h3 className='text-xl font-semibold'>{milestone.title}</h3>
                </div>
                <div className='flex space-x-2'>
                  <Link
                    to={`/module/${milestone.id}`}
                    className='px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                  >
                    Modules
                  </Link>
                  <button
                    onClick={() => handleEditClick(milestone)}
                    className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(milestone.id)}
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
                {editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}
              </h2>
              <button
                onClick={handleFormClose}
                className='text-gray-500 hover:text-gray-700 focus:outline-none'
              >
                ✕
              </button>
            </div>
            <div className='p-6'>
              <MilestoneForm
                courseId={courseId}
                milestoneId={editingMilestone?.milestoneId}
                initialValues={editingMilestone}
                onSuccess={handleFormSuccess}
                isEdit={!!editingMilestone}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMilestone;
