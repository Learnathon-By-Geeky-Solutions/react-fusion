import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import MilestoneForm from '@/components/courseManagement/MilestoneForm';
import { deleteMilestone } from '@/src/services/milestone';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { fetchData } = useApi();
  const [course, setCourse] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseResult = await fetchData(
          (params) =>
            fetch(`${process.env.BACKEND}/course/${courseId}`, {
              headers: { Authorization: params.token }
            }).then((res) => res.json()),
          {}
        );

        if (courseResult.success) {
          setCourse(courseResult.course);
        } else {
          setError('Could not fetch course details');
        }

        const milestonesResult = await fetchData(
          (params) =>
            fetch(`${process.env.BACKEND}/course/${courseId}/milestones`, {
              headers: { Authorization: params.token }
            }).then((res) => res.json()),
          {}
        );

        if (milestonesResult.success) {
          setMilestones(milestonesResult.milestones || []);
        } else {
          console.error('Could not fetch milestones');
        }
      } catch (err) {
        setError('Error fetching course data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, fetchData]);

  const handleAddMilestone = (result) => {
    if (result.success && result.milestone) {
      setMilestones([...milestones, result.milestone]);
      setShowMilestoneForm(false);
    }
  };

  const handleDeleteMilestone = async (milestoneId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this milestone? This action cannot be undone.'
      )
    ) {
      try {
        const params = { data: { milestoneId } };
        const result = await fetchData(deleteMilestone, params);

        if (result.success) {
          setMilestones(milestones.filter((m) => m.id !== milestoneId));
        } else {
          alert('Error: ' + (result.message || 'Could not delete milestone'));
        }
      } catch (error) {
        console.error('Error deleting milestone:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto py-8 px-4'>
        <div className='text-center'>
          <p className='text-lg'>Loading course details...</p>
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
            onClick={() => navigate('/courses')}
            className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <div className='mb-8'>
        <Link to='/courses' className='text-indigo-600 hover:text-indigo-800'>
          &larr; Back to Courses
        </Link>
      </div>

      {course && (
        <div className='mb-12'>
          <div className='flex justify-between items-start mb-6'>
            <h1 className='text-3xl font-bold'>{course.title}</h1>
            <Link
              to={`/courses/edit/${courseId}`}
              className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'
            >
              Edit Course
            </Link>
          </div>

          <div className='bg-white shadow-md rounded-lg overflow-hidden mb-8'>
            <div className='md:flex'>
              <div className='md:w-1/3'>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className='w-full h-64 object-cover'
                  onError={(e) => {
                    e.target.src = '/placeholder-course.png';
                  }}
                />
              </div>
              <div className='p-6 md:w-2/3'>
                <p className='text-gray-600 mb-4'>{course.description}</p>
                <div className='text-2xl font-bold text-indigo-600 mb-4'>
                  ${course.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='mb-8'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-semibold'>Course Milestones</h2>
          <button
            onClick={() => setShowMilestoneForm(!showMilestoneForm)}
            className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
          >
            {showMilestoneForm ? 'Cancel' : 'Add Milestone'}
          </button>
        </div>

        {showMilestoneForm && (
          <div className='mb-8'>
            <MilestoneForm courseId={courseId} onSuccess={handleAddMilestone} />
          </div>
        )}

        {milestones.length === 0 ? (
          <div className='bg-white shadow-md rounded-lg p-6 text-center'>
            <p className='text-gray-500'>
              No milestones added yet. Add your first milestone to structure
              your course.
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className='bg-white shadow-md rounded-lg overflow-hidden'
              >
                <div className='p-6'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='text-xl font-semibold mb-2'>
                        {index + 1}. {milestone.title}
                      </h3>
                      <p className='text-gray-600'>{milestone.description}</p>
                    </div>
                    <div className='flex space-x-2'>
                      <Link
                        to={`/courses/${courseId}/milestones/${milestone.id}`}
                        className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                      >
                        Manage Content
                      </Link>
                      <Link
                        to={`/courses/${courseId}/milestones/${milestone.id}/edit`}
                        className='px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600'
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteMilestone(milestone.id)}
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

export default CourseDetail;
