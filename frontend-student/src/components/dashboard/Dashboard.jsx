import React, { useEffect, useState, useRef } from 'react';
import useApi from '@/src/hooks/useApi';
import { getDashboard, getSingleCourse } from '@/src/services/dashboard';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BookOpen, Clock, CheckCircle, Award, Activity } from 'lucide-react';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  const { fetchData } = useApi();
  const fetchInitiated = useRef(false);

  useEffect(() => {
    if (fetchInitiated.current) return;

    async function fetchCourses() {
      try {
        setIsLoading(true);
        fetchInitiated.current = true;
        const response = await fetchData(getDashboard, {});

        if (response.success) {
          const enrolledCourses = response?.data?.enrolledCourses || [];
          setCourses(enrolledCourses);

          // Fetch individual course analytics
          const analyticsPromises = enrolledCourses.map(async (course) => {
            try {
              const singleCourseRes = await fetchData(
                getSingleCourse,
                course.courseId
              );
              if (singleCourseRes.success) {
                return {
                  courseId: course.courseId,
                  courseTitle: course.title || 'Untitled Course',
                  ...singleCourseRes.data
                };
              }
              return null;
            } catch (err) {
              console.error(
                `Failed to fetch single course for ID ${course.courseId}:`,
                err
              );
              return null;
            }
          });

          const coursesAnalytics = await Promise.all(analyticsPromises);
          const validAnalytics = coursesAnalytics.filter(
            (item) => item !== null
          );
          setAnalytics(validAnalytics);

          // Calculate overall progress across all courses
          if (validAnalytics.length > 0) {
            const totalProgress = validAnalytics.reduce(
              (acc, course) => acc + (course.courseProgress?.progress || 0),
              0
            );
            setOverallProgress(totalProgress / validAnalytics.length);
          }
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();

    // Optional cleanup function that runs when the component unmounts
    return () => {
      fetchInitiated.current = false;
    };
  }, []); // Remove fetchData from dependencies

  // Calculate summary statistics across all courses
  const totalStats = analytics.reduce(
    (acc, course) => {
      const summary = course.summary || {};
      return {
        totalVideos: acc.totalVideos + (summary.totalVideos || 0),
        completedVideos: acc.completedVideos + (summary.completedVideos || 0),
        totalWatchTime: acc.totalWatchTime + (summary.totalWatchTime || 0),
        userWatchTime: acc.userWatchTime + (summary.userWatchTime || 0),
        totalQuizzes: acc.totalQuizzes + (summary.totalQuizzes || 0),
        completedQuizzes:
          acc.completedQuizzes + (summary.completedQuizzes || 0),
        totalModules: acc.totalModules + (summary.totalModules || 0),
        completedModules:
          acc.completedModules + (summary.completedModules || 0),
        totalMilestones: acc.totalMilestones + (summary.totalMilestones || 0),
        completedMilestones:
          acc.completedMilestones + (summary.completedMilestones || 0)
      };
    },
    {
      totalVideos: 0,
      completedVideos: 0,
      totalWatchTime: 0,
      userWatchTime: 0,
      totalQuizzes: 0,
      completedQuizzes: 0,
      totalModules: 0,
      completedModules: 0,
      totalMilestones: 0,
      completedMilestones: 0
    }
  );

  // Format time from seconds to hours:minutes:seconds
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hrs > 0) parts.push(`${hrs}h`);
    if (mins > 0) parts.push(`${mins}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(' ');
  };

  // Data for the progress charts
  const videoProgressData = [
    { name: 'Completed', value: totalStats.completedVideos },
    {
      name: 'Remaining',
      value: totalStats.totalVideos - totalStats.completedVideos
    }
  ];

  const quizProgressData = [
    { name: 'Completed', value: totalStats.completedQuizzes },
    {
      name: 'Remaining',
      value: totalStats.totalQuizzes - totalStats.completedQuizzes
    }
  ];

  const moduleProgressData = [
    { name: 'Completed', value: totalStats.completedModules },
    {
      name: 'Remaining',
      value: totalStats.totalModules - totalStats.completedModules
    }
  ];

  const milestoneProgressData = [
    { name: 'Completed', value: totalStats.completedMilestones },
    {
      name: 'Remaining',
      value: totalStats.totalMilestones - totalStats.completedMilestones
    }
  ];

  const COLORS = ['#4ade80', '#e2e8f0'];

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='dashboard p-6 bg-gray-50 min-h-screen pt-20'>
      <div className='max-w-6xl mx-auto'>
        {/* Overall Progress */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-700'>
              Overall Learning Progress
            </h2>
            <span className='text-2xl font-bold text-blue-600'>
              {Math.round(overallProgress)}%
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded-full h-4'>
            <div
              className='bg-blue-600 h-4 rounded-full transition-all duration-500'
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500'>
            <div className='flex items-center mb-2'>
              <BookOpen className='h-6 w-6 text-blue-500 mr-2' />
              <h3 className='text-lg font-medium text-gray-700'>Videos</h3>
            </div>
            <p className='text-3xl font-bold text-gray-800'>
              {totalStats.completedVideos}{' '}
              <span className='text-sm text-gray-500 font-normal'>
                / {totalStats.totalVideos}
              </span>
            </p>
            <p className='text-sm text-gray-500 mt-1'>videos completed</p>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500'>
            <div className='flex items-center mb-2'>
              <Clock className='h-6 w-6 text-green-500 mr-2' />
              <h3 className='text-lg font-medium text-gray-700'>Watch Time</h3>
            </div>
            <p className='text-3xl font-bold text-gray-800'>
              {formatTime(totalStats.userWatchTime)}
            </p>
            <p className='text-sm text-gray-500 mt-1'>
              out of {formatTime(totalStats.totalWatchTime)}
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500'>
            <div className='flex items-center mb-2'>
              <CheckCircle className='h-6 w-6 text-purple-500 mr-2' />
              <h3 className='text-lg font-medium text-gray-700'>Quizzes</h3>
            </div>
            <p className='text-3xl font-bold text-gray-800'>
              {totalStats.completedQuizzes}{' '}
              <span className='text-sm text-gray-500 font-normal'>
                / {totalStats.totalQuizzes}
              </span>
            </p>
            <p className='text-sm text-gray-500 mt-1'>quizzes completed</p>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500'>
            <div className='flex items-center mb-2'>
              <Award className='h-6 w-6 text-amber-500 mr-2' />
              <h3 className='text-lg font-medium text-gray-700'>Milestones</h3>
            </div>
            <p className='text-3xl font-bold text-gray-800'>
              {totalStats.completedMilestones}{' '}
              <span className='text-sm text-gray-500 font-normal'>
                / {totalStats.totalMilestones}
              </span>
            </p>
            <p className='text-sm text-gray-500 mt-1'>milestones achieved</p>
          </div>
        </div>

        {/* Progress Charts */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div className='bg-white rounded-xl shadow-md p-6'>
            <h3 className='text-lg font-medium text-gray-700 mb-4'>
              Learning Activity
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col items-center'>
                <p className='text-sm font-medium text-gray-600 mb-2'>
                  Video Completion
                </p>
                <div className='h-40 w-40'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={videoProgressData}
                        cx='50%'
                        cy='50%'
                        innerRadius={36}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey='value'
                      >
                        {videoProgressData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className='text-center mt-2'>
                  <span className='font-bold text-xl'>
                    {totalStats.totalVideos > 0
                      ? Math.round(
                          (totalStats.completedVideos /
                            totalStats.totalVideos) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </p>
              </div>

              <div className='flex flex-col items-center'>
                <p className='text-sm font-medium text-gray-600 mb-2'>
                  Quiz Completion
                </p>
                <div className='h-40 w-40'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={quizProgressData}
                        cx='50%'
                        cy='50%'
                        innerRadius={36}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey='value'
                      >
                        {quizProgressData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className='text-center mt-2'>
                  <span className='font-bold text-xl'>
                    {totalStats.totalQuizzes > 0
                      ? Math.round(
                          (totalStats.completedQuizzes /
                            totalStats.totalQuizzes) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-md p-6'>
            <h3 className='text-lg font-medium text-gray-700 mb-4'>
              Course Milestones
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col items-center'>
                <p className='text-sm font-medium text-gray-600 mb-2'>
                  Module Completion
                </p>
                <div className='h-40 w-40'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={moduleProgressData}
                        cx='50%'
                        cy='50%'
                        innerRadius={36}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey='value'
                      >
                        {moduleProgressData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className='text-center mt-2'>
                  <span className='font-bold text-xl'>
                    {totalStats.totalModules > 0
                      ? Math.round(
                          (totalStats.completedModules /
                            totalStats.totalModules) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </p>
              </div>

              <div className='flex flex-col items-center'>
                <p className='text-sm font-medium text-gray-600 mb-2'>
                  Milestone Completion
                </p>
                <div className='h-40 w-40'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={milestoneProgressData}
                        cx='50%'
                        cy='50%'
                        innerRadius={36}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey='value'
                      >
                        {milestoneProgressData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className='text-center mt-2'>
                  <span className='font-bold text-xl'>
                    {totalStats.totalMilestones > 0
                      ? Math.round(
                          (totalStats.completedMilestones /
                            totalStats.totalMilestones) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Course Activity */}
        <div className='bg-white rounded-xl shadow-md p-6'>
          <h3 className='text-lg font-medium text-gray-700 mb-4'>
            Recent Course Activity
          </h3>
          {analytics.length > 0 ? (
            <div className='space-y-4'>
              {analytics.slice(0, 3).map((course, index) => (
                <div
                  key={index}
                  className='border-b border-gray-100 pb-4 last:border-0 last:pb-0'
                >
                  <div className='flex justify-between items-center'>
                    <div>
                      <h4 className='font-medium text-gray-800'>
                        {course.courseTitle}
                      </h4>
                      <p className='text-sm text-gray-500 mt-1'>
                        {course.summary?.completedModules || 0} of{' '}
                        {course.summary?.totalModules || 0} modules completed
                      </p>
                    </div>
                    <div className='flex items-center'>
                      <Activity className='h-5 w-5 text-blue-500 mr-2' />
                      <span className='font-bold'>
                        {course.courseProgress?.progress
                          ? Math.round(course.courseProgress.progress)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                  <div className='mt-2 w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-blue-500 h-2 rounded-full'
                      style={{
                        width: `${course.courseProgress?.progress || 0}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-500 text-center py-4'>
              No recent course activity found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
