// src/pages/Courses/ModuleDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import VideoForm from '@/components/courseManagement/VideoForm';
import QuizForm from '@/components/courseManagement/QuizForm';
import { deleteVideo } from '@/src/services/video';
import { deleteQuiz, getVideo as getQuiz } from '@/src/services/quiz';

const ModuleDetail = () => {
  const { courseId, milestoneId, moduleId } = useParams();
  const navigate = useNavigate();
  const { fetchData } = useApi();
  const [module, setModule] = useState(null);
  const [videos, setVideos] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');

  useEffect(() => {
    const fetchModuleContent = async () => {
      try {
        // Fetch module details
        const moduleResult = await fetchData(
          (params) =>
            fetch(`${process.env.BACKEND}/module/${moduleId}`, {
              headers: { Authorization: params.token }
            }).then((res) => res.json()),
          {}
        );

        if (moduleResult.success) {
          setModule(moduleResult.module);
        } else {
          setError('Could not fetch module details');
        }

        // Fetch videos for this module
        const videosResult = await fetchData(
          (params) =>
            fetch(`${process.env.BACKEND}/module/${moduleId}/videos`, {
              headers: { Authorization: params.token }
            }).then((res) => res.json()),
          {}
        );

        if (videosResult.success) {
          setVideos(videosResult.videos || []);
        } else {
          console.error('Could not fetch videos');
        }

        // Check if quiz exists for this module
        const quizResult = await fetchData(getQuiz, { videoId: moduleId });

        if (quizResult.success) {
          setQuiz(quizResult.quiz);
        }
      } catch (err) {
        setError('Error fetching module data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleContent();
  }, [moduleId, fetchData]);

  const handleDeleteVideo = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        const result = await fetchData(deleteVideo, {
          data: { videoId }
        });

        if (result.success) {
          setVideos(videos.filter((video) => video.id !== videoId));
        } else {
          alert('Failed to delete video');
        }
      } catch (err) {
        console.error('Error deleting video:', err);
        alert('Error deleting video');
      }
    }
  };

  const handleDeleteQuiz = async () => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        const result = await fetchData(deleteQuiz, {
          data: { videoId: moduleId }
        });

        if (result.success) {
          setQuiz(null);
        } else {
          alert('Failed to delete quiz');
        }
      } catch (err) {
        console.error('Error deleting quiz:', err);
        alert('Error deleting quiz');
      }
    }
  };

  const handleVideoFormSuccess = (newVideo) => {
    setVideos([...videos, newVideo]);
    setShowVideoForm(false);
  };

  const handleQuizFormSuccess = (newQuiz) => {
    setQuiz(newQuiz);
    setShowQuizForm(false);
  };

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto py-8 px-4'>
        <div className='text-center'>
          <p className='text-lg'>Loading module content...</p>
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

      {module && (
        <div className='mb-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold'>{module.title}</h1>
            <Link
              to={`/courses/${courseId}/milestones/${milestoneId}/modules/${moduleId}/edit`}
              className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
            >
              Edit Module
            </Link>
          </div>
          <p className='mt-2 text-gray-600'>{module.description}</p>
        </div>
      )}

      <div className='mb-6'>
        <div className='border-b border-gray-200'>
          <nav className='flex -mb-px'>
            <button
              onClick={() => setActiveTab('videos')}
              className={`py-4 px-6 border-b-2 font-medium text-md ${
                activeTab === 'videos'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`py-4 px-6 border-b-2 font-medium text-md ${
                activeTab === 'quiz'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Quiz
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'videos' && (
        <div>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-semibold'>Videos</h2>
            <button
              onClick={() => setShowVideoForm(!showVideoForm)}
              className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'
            >
              {showVideoForm ? 'Cancel' : 'Add Video'}
            </button>
          </div>

          {showVideoForm && (
            <div className='mb-8 p-6 bg-gray-50 rounded-lg shadow-sm'>
              <h3 className='text-xl font-semibold mb-4'>Add New Video</h3>
              <VideoForm
                moduleId={moduleId}
                onSuccess={handleVideoFormSuccess}
              />
            </div>
          )}

          {videos.length === 0 ? (
            <p className='text-gray-500 text-center py-8'>
              No videos available for this module.
            </p>
          ) : (
            <div className='grid gap-6'>
              {videos.map((video) => (
                <div
                  key={video.id}
                  className='p-4 border border-gray-200 rounded-md bg-white shadow-sm'
                >
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='font-semibold text-lg'>{video.title}</h3>
                      <p className='text-gray-600 text-sm mt-1'>
                        Length: {video.length} minutes
                      </p>
                    </div>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <a
                      href={video.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-indigo-600 hover:text-indigo-800'
                    >
                      Watch Video
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'quiz' && (
        <div>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-semibold'>Quiz</h2>
            {!quiz && !showQuizForm && (
              <button
                onClick={() => setShowQuizForm(true)}
                className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'
              >
                Add Quiz
              </button>
            )}
            {showQuizForm && (
              <button
                onClick={() => setShowQuizForm(false)}
                className='px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700'
              >
                Cancel
              </button>
            )}
          </div>

          {showQuizForm && (
            <div className='mb-8 p-6 bg-gray-50 rounded-lg shadow-sm'>
              <h3 className='text-xl font-semibold mb-4'>Add Quiz</h3>
              <QuizForm moduleId={moduleId} onSuccess={handleQuizFormSuccess} />
            </div>
          )}

          {!quiz && !showQuizForm ? (
            <p className='text-gray-500 text-center py-8'>
              No quiz available for this module.
            </p>
          ) : quiz && !showQuizForm ? (
            <div className='p-6 border border-gray-200 rounded-lg bg-white shadow-sm'>
              <div className='flex justify-between items-start mb-6'>
                <h3 className='text-xl font-semibold'>Module Quiz</h3>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => setShowQuizForm(true)}
                    className='px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm'
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteQuiz}
                    className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm'
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div>
                <p className='mb-2 font-medium'>
                  Questions: {quiz.questions ? quiz.questions.length : 0}
                </p>
                <p className='text-gray-600'>
                  Total Points:{' '}
                  {quiz.questions
                    ? quiz.questions.reduce((total, q) => total + q.points, 0)
                    : 0}
                </p>
              </div>

              <div className='mt-6'>
                <h4 className='font-semibold mb-3'>Preview Questions:</h4>
                {quiz.questions &&
                  quiz.questions.slice(0, 3).map((question, index) => (
                    <div key={index} className='mb-4 p-4 bg-gray-50 rounded'>
                      <p className='font-medium'>
                        {index + 1}. {question.question}
                      </p>
                      <p className='mt-1 text-sm text-gray-500'>
                        Points: {question.points}
                      </p>
                    </div>
                  ))}
                {quiz.questions && quiz.questions.length > 3 && (
                  <p className='text-gray-500 italic'>
                    + {quiz.questions.length - 3} more questions
                  </p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ModuleDetail;
