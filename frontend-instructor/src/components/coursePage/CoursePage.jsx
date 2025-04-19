import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  updateCourse,
  getSingleCourse,
  deleteCourse
} from '@/src/services/course';
import VideoSection from './VideoSection';
import CourseSidebar from './CourseSidebar';
import QuizSection from './QuizSection';
import useApi from '@/src/hooks/useApi';

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openMilestones, setOpenMilestones] = useState({});
  const [openModules, setOpenModules] = useState({});
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { fetchData } = useApi();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const response = await fetchData(getSingleCourse, { courseId });

      if (response.success) {
        setCourse(response.data);
        const firstMilestone = response.data.milestones?.[0];
        const firstModule = firstMilestone?.modules?.[0];
        if (firstMilestone) {
          setOpenMilestones({ [firstMilestone.id]: true });

          if (firstModule) {
            setOpenModules({ [firstModule.id]: true });
          }
        }

        if (firstModule?.moduleItems?.[0]) {
          const firstItem = firstModule.moduleItems[0];

          setSelectedItem({
            ...firstItem,
            milestoneNumber: 1,
            moduleNumber: 1,
            itemNumber: 1
          });
        }
      }
    } catch (error) {
      console.error('[CoursePage] Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMilestone = (milestoneId) => {
    setOpenMilestones((prev) => {
      const newState = {
        ...prev,
        [milestoneId]: !prev[milestoneId]
      };
      return newState;
    });
  };

  const toggleModule = (moduleId) => {
    setOpenModules((prev) => {
      const newState = {
        ...prev,
        [moduleId]: !prev[moduleId]
      };
      return newState;
    });
  };

  const handleItemSelect = (
    item,
    milestoneNumber,
    moduleNumber,
    itemNumber
  ) => {
    const itemWithNumbers = {
      ...item,
      milestoneNumber,
      moduleNumber,
      itemNumber
    };

    setSelectedItem(itemWithNumbers);
  };

  const handlePublish = async () => {
    try {
      const payload = {
        courseId,
        courseData: {
          isPublished: true
        }
      };

      const response = await fetchData(updateCourse, payload);

      if (response.success) {
        setCourse((prev) => ({
          ...prev,
          isPublished: true
        }));
        setShowPublishModal(false);
      }
    } catch (error) {
      console.error('[CoursePage] Error publishing course:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetchData(deleteCourse, { courseId });
      if (response.success) {
        setShowDeleteModal(false);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('[CoursePage] Error deleting course:', error);
    }
  };

  const calculateQuizIndex = () => {
    if (!course || !selectedItem) return 0;

    let quizIndex = 0;
    for (const milestone of course.milestones || []) {
      for (const module of milestone.modules || []) {
        for (const item of module.moduleItems || []) {
          if (item.quiz) quizIndex++;
          if (item === selectedItem) return quizIndex;
        }
      }
    }
    return quizIndex;
  };

  const renderSelectedItemTitle = () => {
    if (!selectedItem) return null;

    const quizIndex = calculateQuizIndex();
    return (
      <h2 className='text-2xl font-bold mb-4'>
        {selectedItem.milestoneNumber}.{selectedItem.moduleNumber}.
        {selectedItem.itemNumber} -{' '}
        {selectedItem.video?.title || `Quiz ${quizIndex}`}
      </h2>
    );
  };

  const renderSelectedItemContent = () => {
    if (!selectedItem) return null;

    return (
      <>
        {renderSelectedItemTitle()}
        {selectedItem.video && (
          <VideoSection
            videoId={selectedItem.video.id}
            title={selectedItem.video.title}
          />
        )}
        {selectedItem.quiz && <QuizSection quiz={selectedItem.quiz.id} />}
      </>
    );
  };

  if (loading) return <p className='text-center text-lg'>Loading course...</p>;
  if (!course)
    return <p className='text-center text-red-500'>Course not found.</p>;

  return (
    <div className='max-w-6xl mx-auto py-8 mt-16'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>{course.title}</h1>
        <div className='flex space-x-4'>
          {!course.isPublished ? (
            <button
              onClick={() => {
                setShowPublishModal(true);
              }}
              className='bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition shadow-sm flex items-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                  clipRule='evenodd'
                />
              </svg>
              Publish Course
            </button>
          ) : (
            <button
              onClick={() => {
                setShowDeleteModal(true);
              }}
              className='bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition shadow-sm flex items-center'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 mr-2'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
              Delete Course
            </button>
          )}
          <Link
            to={`/edit-course/${course.id}`}
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition shadow-sm flex items-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 mr-2'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
            </svg>
            Edit Course
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>{renderSelectedItemContent()}</div>

        <CourseSidebar
          course={course}
          selectedItem={selectedItem}
          openMilestones={openMilestones}
          openModules={openModules}
          toggleMilestone={toggleMilestone}
          toggleModule={toggleModule}
          handleItemSelect={handleItemSelect}
        />
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-96 shadow-xl'>
            <h3 className='text-xl font-bold mb-4'>Publish Course</h3>
            <p className='text-gray-700 mb-6'>
              Are you sure you want to publish this course? Once published, it
              will be visible to all students.
            </p>
            <div className='flex justify-end space-x-3'>
              <button
                onClick={() => {
                  setShowPublishModal(false);
                }}
                className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition'
              >
                Cancel
              </button>
              <button
                onClick={handlePublish}
                className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition'
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-96 shadow-xl'>
            <h3 className='text-xl font-bold mb-4 text-red-600'>
              Delete Course
            </h3>
            <p className='text-gray-700 mb-6'>
              Are you sure you want to delete this course? This action cannot be
              undone.
            </p>
            <div className='flex justify-end space-x-3'>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                }}
                className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
