import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import VideoForm from '@/src/components/courseManagement/VideoForm';
import QuizForm from '@/src/components/courseManagement/QuizForm';
import useApi from '@/src/hooks/useApi';
import { checkModule } from '@/src/services/module';
import { deleteVideo, checkVideo } from '@/src/services/video';
import { deleteQuiz, getQuiz } from '@/src/services/quiz';
import { getCourseById } from '@/src/services/course';
import { checkMilestone } from '@/src/services/milestone';

const CreateContent = () => {
  const { moduleId } = useParams();
  const [activeForm, setActiveForm] = useState(null);
  const [refreshList, setRefreshList] = useState(0);
  const [milestoneId, setMilestoneId] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [moduleItems, setModuleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moduleTitle, setModuleTitle] = useState('');
  const [fetchedItemData, setFetchedItemData] = useState(null);
  const [isLoadingItemData, setIsLoadingItemData] = useState(false);
  const [courseId, setCourseId] = useState('');
  const { fetchData } = useApi();

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const moduleResult = await fetchData(checkModule, { moduleId });
        const milestoneResult = await fetchData(checkMilestone, {
          milestoneId: moduleResult.data.milestoneId
        });

        const courseId = milestoneResult.data.courseId;
        setMilestoneId(moduleResult.data.milestoneId);
        setCourseId(courseId);

        const result = await fetchData(getCourseById, { courseId });

        if (result.success) {
          const course = result.data;
          let foundModule = null;

          for (const milestone of course.milestones) {
            const module = milestone.modules.find((m) => m.id === moduleId);
            if (module) {
              foundModule = module;
              break;
            }
          }

          if (foundModule) {
            setModuleTitle(foundModule.title);

            const items = foundModule.moduleItems || [];
            items.sort((a, b) => a.order - b.order);
            setModuleItems(items);
          } else {
            console.error('Module not found in course data');
            setModuleItems([]);
          }
        } else {
          console.error('Failed to load course data:', result.message);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [refreshList]);

  const handleFormClose = () => {
    setActiveForm(null);
    setEditingItem(null);
    setFetchedItemData(null);
  };

  const handleEditItem = async (item) => {
    setIsLoadingItemData(true);
    setEditingItem(item);

    try {
      let result;
      if (item.video) {
        result = await fetchData(checkVideo, { videoId: item.video.id });
        setActiveForm('video');
      } else if (item.quiz) {
        result = await fetchData(getQuiz, { quizId: item.quiz.id });
        setActiveForm('quiz');
      }

      if (result && result.success) {
        setFetchedItemData(result.data);
      } else {
        console.error('Failed to fetch item data:', result?.message);
        alert('Error: Could not load item data for editing');
      }
    } catch (error) {
      console.error('Error fetching item data:', error);
      alert('Error: Could not load item data for editing');
    } finally {
      setIsLoadingItemData(false);
    }
  };

  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleFormSuccess = () => {
    setActiveForm(null);
    setEditingItem(null);
    setFetchedItemData(null);
    setRefreshList((prev) => prev + 1);
    if (editingItem) {
      alert('Item updated successfully!');
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      let result;
      console.log(itemToDelete);
      if (itemToDelete.video) {
        result = await fetchData(deleteVideo, {
          videoId: itemToDelete.video.id
        });
      } else {
        result = await fetchData(deleteQuiz, { quizId: itemToDelete.quiz.id });
      }

      if (result.success) {
        setRefreshList((prev) => prev + 1);
        alert(
          itemToDelete.video
            ? 'Video deleted successfully!'
            : 'Quiz deleted successfully!'
        );
      } else {
        alert('Error: ' + (result.message || 'Could not delete item'));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const getQuizNumber = (index) => {
    let quizCount = 0;
    for (let i = 0; i <= index; i++) {
      if (moduleItems[i].quiz) {
        quizCount++;
      }
    }
    return quizCount;
  };

  return (
    <div className='max-w-6xl container mx-auto p-6'>
      <div className='flex justify-between mb-8'>
        <Link
          to={`/module/${milestoneId}`}
          className='text-indigo-600 hover:text-indigo-800'
        >
          &larr; Back to Module
        </Link>
        <Link
          to={`/courses/${courseId}`}
          className='text-indigo-600 hover:text-indigo-800'
        >
          Preview and Submit &rarr;
        </Link>
      </div>
      <h1 className='text-2xl font-bold mb-6'>Content Management</h1>

      <div className='flex space-x-4 mb-6'>
        <button
          onClick={() => {
            setEditingItem(null);
            setFetchedItemData(null);
            setActiveForm('video');
          }}
          className='px-4 py-2 font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Add Video
        </button>

        <button
          onClick={() => {
            setEditingItem(null);
            setFetchedItemData(null);
            setActiveForm('quiz');
          }}
          className='px-4 py-2 font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Add Quiz
        </button>
      </div>

      {/* Content List */}
      <div className='mt-8'>
        {loading ? (
          <div className='text-center py-4'>Loading content...</div>
        ) : moduleItems.length === 0 ? (
          <div className='text-center py-4'>
            No content found. Add videos or quizzes using the buttons above.
          </div>
        ) : (
          <>
            <h2 className='text-2xl font-bold mb-4'>
              Content for {moduleTitle}
            </h2>
            <div className='space-y-4'>
              {moduleItems.map((item, index) => (
                <div
                  key={item.id}
                  className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'
                >
                  {item.video ? (
                    <h4 className='text-lg font-medium'>{item.video.title}</h4>
                  ) : (
                    <h4 className='text-lg font-medium'>
                      Quiz {getQuizNumber(index)}
                    </h4>
                  )}

                  <div className='flex space-x-2'>
                    <button
                      onClick={() => handleEditItem(item)}
                      className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item)}
                      className='px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Form Modal */}
      {activeForm && (
        <div className='fixed inset-0 bg-black/75 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden'>
            <div className='flex justify-between items-center px-6 py-4 bg-gray-100'>
              <h2 className='text-xl font-semibold'>
                {editingItem
                  ? `Edit ${activeForm === 'video' ? 'Video' : 'Quiz'}`
                  : `Add New ${activeForm === 'video' ? 'Video' : 'Quiz'}`}
              </h2>
              <button
                onClick={handleFormClose}
                className='text-gray-500 hover:text-gray-700 focus:outline-none'
              >
                ✕
              </button>
            </div>
            <div className='p-6 max-h-[80vh] overflow-y-auto'>
              {isLoadingItemData ? (
                <div className='text-center py-4'>Loading data...</div>
              ) : activeForm === 'video' ? (
                <VideoForm
                  moduleId={moduleId}
                  onSuccess={handleFormSuccess}
                  videoData={fetchedItemData}
                  isEditing={!!editingItem}
                  videoId={editingItem?.video?.id}
                />
              ) : (
                <QuizForm
                  moduleId={moduleId}
                  onSuccess={handleFormSuccess}
                  quizData={fetchedItemData}
                  isEditing={!!editingItem}
                  quizId={editingItem?.quiz?.id}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && itemToDelete && (
        <div className='fixed inset-0 bg-black/75 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden'>
            <div className='flex justify-between items-center px-6 py-4 bg-gray-100'>
              <h2 className='text-xl font-semibold'>Confirm Delete</h2>
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setItemToDelete(null);
                }}
                className='text-gray-500 hover:text-gray-700 focus:outline-none'
              >
                ✕
              </button>
            </div>
            <div className='p-6'>
              <p className='mb-6'>
                Are you sure you want to delete this{' '}
                {itemToDelete.video ? 'video' : 'quiz'}? This action cannot be
                undone.
              </p>
              <div className='flex justify-end space-x-3'>
                <button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setItemToDelete(null);
                  }}
                  className='px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400'
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className='px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContent;
