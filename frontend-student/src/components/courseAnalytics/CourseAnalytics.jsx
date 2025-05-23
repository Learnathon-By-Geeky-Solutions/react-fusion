import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { getSingleCourse } from '@/src/services/dashboard';
import { formatTime } from '@/src/utils/formatters';
import PropTypes from 'prop-types'; // Import PropTypes for props validation
import {
  BookOpen,
  Clock,
  CheckCircle,
  Award,
  ArrowLeft,
  Play,
  FileText
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
        <p className='text-gray-600'>{message}</p>
      </div>
    </div>
  );
}

// Add PropTypes validation for LoadingSpinner
LoadingSpinner.propTypes = {
  message: PropTypes.string
};

export default function CourseAnalytics() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchData } = useApi();

  useEffect(() => {
    if (!courseId) return;

    async function fetchCourseData() {
      try {
        setIsLoading(true);
        const response = await fetchData(getSingleCourse, { data: courseId });

        if (response.success) {
          setCourseData(response.data);
        } else {
          console.error('Failed to fetch course data');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourseData();
  }, [courseId]);

  if (isLoading || !courseData) {
    return <LoadingSpinner message='Loading course analytics...' />;
  }

  const { courseProgress, summary } = courseData;
  const course = courseProgress?.course || {};

  const moduleCompletionData = [
    {
      name: 'Completed',
      value: summary?.completedModules || 0,
      id: 'completed-modules'
    },
    {
      name: 'Remaining',
      value: (summary?.totalModules || 0) - (summary?.completedModules || 0),
      id: 'remaining-modules'
    }
  ];

  const videoCompletionData = [
    {
      name: 'Completed',
      value: summary?.completedVideos || 0,
      id: 'completed-videos'
    },
    {
      name: 'Remaining',
      value: (summary?.totalVideos || 0) - (summary?.completedVideos || 0),
      id: 'remaining-videos'
    }
  ];

  const quizCompletionData = [
    {
      name: 'Completed',
      value: summary?.completedQuizzes || 0,
      id: 'completed-quizzes'
    },
    {
      name: 'Remaining',
      value: (summary?.totalQuizzes || 0) - (summary?.completedQuizzes || 0),
      id: 'remaining-quizzes'
    }
  ];

  const COLORS = ['#4ade80', '#e2e8f0'];

  const modulePercentage =
    summary?.totalModules > 0
      ? Math.round((summary.completedModules / summary.totalModules) * 100)
      : 0;

  const videoPercentage =
    summary?.totalVideos > 0
      ? Math.round((summary.completedVideos / summary.totalVideos) * 100)
      : 0;

  const quizPercentage =
    summary?.totalQuizzes > 0
      ? Math.round((summary.completedQuizzes / summary.totalQuizzes) * 100)
      : 0;

  const watchTimePercentage =
    summary?.totalWatchTime > 0
      ? Math.round((summary.userWatchTime / summary.totalWatchTime) * 100)
      : 0;

  const quizScorePercentage =
    summary?.totalScore > 0
      ? Math.round((summary.userScore / summary.totalScore) * 100)
      : 0;

  // Data for the watch time pie chart with unique IDs
  const watchTimeData = [
    { value: summary?.userWatchTime || 0, id: 'user-watch-time' },
    {
      value: (summary?.totalWatchTime || 0) - (summary?.userWatchTime || 0),
      id: 'remaining-watch-time'
    }
  ];

  // Data for the quiz performance pie chart with unique IDs
  const quizScoreData = [
    { value: summary?.userScore || 0, id: 'user-score' },
    {
      value: (summary?.totalScore || 0) - (summary?.userScore || 0),
      id: 'remaining-score'
    }
  ];

  return (
    <div className='analytics-page p-6 bg-gray-50 min-h-screen pt-20'>
      <div className='max-w-6xl mx-auto'>
        {/* Header with course info */}
        <div className='mb-6'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center text-blue-600 hover:text-blue-800 mb-4'
          >
            <ArrowLeft className='h-4 w-4 mr-1' />
            Back to Dashboard
          </button>

          <div className='bg-white rounded-xl shadow-md overflow-hidden'>
            <div className='flex flex-col md:flex-row'>
              {course.thumbnail && (
                <div className='md:w-1/3'>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className='h-48 w-full object-cover md:h-full'
                  />
                </div>
              )}
              <div className='p-6 md:w-2/3'>
                <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                  {course.title || 'Untitled Course'}
                </h1>
                <p className='text-gray-600 mb-4'>
                  {course.description || 'No description available'}
                </p>
                <div className='text-sm text-gray-500 mb-2'>
                  Overall Progress:{' '}
                  <span className='font-bold text-blue-600'>
                    {modulePercentage}%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-3'>
                  <div
                    className='bg-blue-600 h-3 rounded-full'
                    style={{ width: `${modulePercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Statistics */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500'>
            <div className='flex items-center mb-2'>
              <BookOpen className='h-6 w-6 text-blue-500 mr-2' />
              <h3 className='text-lg font-medium text-gray-700'>Videos</h3>
            </div>
            <p className='text-3xl font-bold text-gray-800'>
              {summary?.completedVideos || 0}{' '}
              <span className='text-sm text-gray-500 font-normal'>
                / {summary?.totalVideos || 0}
              </span>
            </p>
            <p className='text-sm text-gray-500 mt-1'>
              {videoPercentage}% complete
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500'>
            <div className='flex items-center mb-2'>
              <Clock className='h-6 w-6 text-green-500 mr-2' />
              <h3 className='text-lg font-medium text-gray-700'>Watch Time</h3>
            </div>
            <p className='text-3xl font-bold text-gray-800'>
              {formatTime(summary?.userWatchTime || 0)}
            </p>
            <p className='text-sm text-gray-500 mt-1'>
              out of {formatTime(summary?.totalWatchTime || 0)} (
              {watchTimePercentage}%)
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500'>
            <div className='flex items-center mb-2'>
              <CheckCircle className='h-6 w-6 text-purple-500 mr-2' />
              <h3 className='text-lg font-medium text-gray-700'>Quizzes</h3>
            </div>
            <p className='text-3xl font-bold text-gray-800'>
              {summary?.completedQuizzes || 0}{' '}
              <span className='text-sm text-gray-500 font-normal'>
                / {summary?.totalQuizzes || 0}
              </span>
            </p>
            <p className='text-sm text-gray-500 mt-1'>
              {quizPercentage}% complete
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500'>
            <div className='flex items-center mb-2'>
              <Award className='h-6 w-6 text-amber-500 mr-2' />
              <h3 className='text-lg font-medium text-gray-700'>Score</h3>
            </div>
            <p className='text-3xl font-bold text-gray-800'>
              {summary?.userScore || 0}{' '}
              <span className='text-sm text-gray-500 font-normal'>
                / {summary?.totalScore || 0}
              </span>
            </p>
            <p className='text-sm text-gray-500 mt-1'>
              {quizScorePercentage}% score rate
            </p>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          {/* Progress Charts */}
          <div className='bg-white rounded-xl shadow-md p-6'>
            <h3 className='text-lg font-medium text-gray-700 mb-4'>
              Completion Progress
            </h3>
            <div className='grid grid-cols-3 gap-4'>
              <div className='flex flex-col items-center'>
                <p className='text-sm font-medium text-gray-600 mb-2'>
                  Modules
                </p>
                <div className='h-32 w-32'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={moduleCompletionData}
                        cx='50%'
                        cy='50%'
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey='value'
                      >
                        {moduleCompletionData.map((entry) => (
                          <Cell
                            key={entry.id}
                            fill={
                              entry.name === 'Completed' ? COLORS[0] : COLORS[1]
                            }
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className='text-center mt-2'>
                  <span className='font-bold text-lg'>{modulePercentage}%</span>
                </p>
              </div>

              <div className='flex flex-col items-center'>
                <p className='text-sm font-medium text-gray-600 mb-2'>Videos</p>
                <div className='h-32 w-32'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={videoCompletionData}
                        cx='50%'
                        cy='50%'
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey='value'
                      >
                        {videoCompletionData.map((entry) => (
                          <Cell
                            key={entry.id}
                            fill={
                              entry.name === 'Completed' ? COLORS[0] : COLORS[1]
                            }
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className='text-center mt-2'>
                  <span className='font-bold text-lg'>{videoPercentage}%</span>
                </p>
              </div>

              <div className='flex flex-col items-center'>
                <p className='text-sm font-medium text-gray-600 mb-2'>
                  Quizzes
                </p>
                <div className='h-32 w-32'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={quizCompletionData}
                        cx='50%'
                        cy='50%'
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey='value'
                      >
                        {quizCompletionData.map((entry) => (
                          <Cell
                            key={entry.id}
                            fill={
                              entry.name === 'Completed' ? COLORS[0] : COLORS[1]
                            }
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className='text-center mt-2'>
                  <span className='font-bold text-lg'>{quizPercentage}%</span>
                </p>
              </div>
            </div>
          </div>

          {/* Content Progress (replacing Module Progress) */}
          <div className='bg-white rounded-xl shadow-md p-6'>
            <h3 className='text-lg font-medium text-gray-700 mb-4'>
              Content Progress
            </h3>
            <div className='space-y-4'>
              <div className='flex items-center justify-between pb-2 border-b border-gray-100'>
                <div className='flex items-center'>
                  <Play className='h-5 w-5 text-blue-500 mr-3' />
                  <span className='text-gray-700'>Videos Watched</span>
                </div>
                <div className='flex items-center'>
                  <span className='mr-2 font-medium'>
                    {summary?.completedVideos || 0}/{summary?.totalVideos || 0}
                  </span>
                  <div className='w-16 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-blue-500 h-2 rounded-full'
                      style={{ width: `${videoPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between pb-2 border-b border-gray-100'>
                <div className='flex items-center'>
                  <FileText className='h-5 w-5 text-purple-500 mr-3' />
                  <span className='text-gray-700'>Quizzes Completed</span>
                </div>
                <div className='flex items-center'>
                  <span className='mr-2 font-medium'>
                    {summary?.completedQuizzes || 0}/
                    {summary?.totalQuizzes || 0}
                  </span>
                  <div className='w-16 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-purple-500 h-2 rounded-full'
                      style={{ width: `${quizPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <Clock className='h-5 w-5 text-green-500 mr-3' />
                  <span className='text-gray-700'>Watch Time</span>
                </div>
                <div className='flex items-center'>
                  <span className='mr-2 font-medium'>
                    {formatTime(summary?.userWatchTime || 0)}
                  </span>
                  <div className='w-16 bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-green-500 h-2 rounded-full'
                      style={{ width: `${watchTimePercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          {/* Video Watch Time (replacing Content Completion) */}
          <div className='bg-white rounded-xl shadow-md p-6'>
            <h3 className='text-lg font-medium text-gray-700 mb-4'>
              Video Watch Time
            </h3>
            <div className='flex flex-col items-center justify-center h-full'>
              <div className='relative h-40 w-40 mb-4'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <span className='text-4xl font-bold text-green-600'>
                    {watchTimePercentage}%
                  </span>
                </div>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={watchTimeData}
                      cx='50%'
                      cy='50%'
                      innerRadius={50}
                      outerRadius={70}
                      startAngle={90}
                      endAngle={-270}
                      dataKey='value'
                    >
                      <Cell key='user-watch-time-cell' fill='#4ade80' />
                      <Cell key='remaining-watch-time-cell' fill='#e2e8f0' />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className='text-center text-gray-600'>
                You've watched {formatTime(summary?.userWatchTime || 0)} out of{' '}
                {formatTime(summary?.totalWatchTime || 0)} total videos
              </p>
              {watchTimePercentage >= 80 && (
                <div className='mt-3 text-green-600 flex items-center'>
                  <Clock className='h-5 w-5 mr-1' />
                  <span>Great progress!</span>
                </div>
              )}
            </div>
          </div>

          {/* Quiz Performance (kept the same) */}
          <div className='bg-white rounded-xl shadow-md p-6'>
            <h3 className='text-lg font-medium text-gray-700 mb-4'>
              Quiz Performance
            </h3>
            <div className='flex flex-col items-center justify-center h-full'>
              <div className='relative h-40 w-40 mb-4'>
                <div className='absolute inset-0 flex items-center justify-center'>
                  <span className='text-4xl font-bold text-blue-600'>
                    {quizScorePercentage}%
                  </span>
                </div>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={quizScoreData}
                      cx='50%'
                      cy='50%'
                      innerRadius={50}
                      outerRadius={70}
                      startAngle={90}
                      endAngle={-270}
                      dataKey='value'
                    >
                      <Cell key='user-score-cell' fill='#4ade80' />
                      <Cell key='remaining-score-cell' fill='#e2e8f0' />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className='text-center text-gray-600'>
                You've scored {summary?.userScore || 0} out of{' '}
                {summary?.totalScore || 0} possible points
              </p>
              {quizScorePercentage >= 80 && (
                <div className='mt-3 text-green-600 flex items-center'>
                  <Award className='h-5 w-5 mr-1' />
                  <span>Excellent performance!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='bg-blue-50 rounded-xl shadow-sm p-6 text-center'>
          <h3 className='text-lg font-medium text-blue-800 mb-2'>
            Continue Your Learning Journey
          </h3>
          <p className='text-blue-600 mb-4'>
            You've made great progress! Keep going to master this course.
          </p>
          <button
            onClick={() => navigate(`/enrolled/${courseId}`)}
            className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}
