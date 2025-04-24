import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { getDashboard, getSingleCourse } from '@/src/services/dashboard';
import { profile } from '@/src/services/profile';
import DashboardSummary from './DashboardSummary';
import ProgressStats from './ProgressStats';
import ProgressCharts from './ProgressCharts';
import RecentCourseActivity from './RecentCourseActivity';

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

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [detailedCourses, setDetailedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overallProgress, setOverallProgress] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [totalStats, setTotalStats] = useState({
    totalVideos: 0,
    completedVideos: 0,
    totalWatchTime: 0,
    userWatchTime: 0,
    totalQuizzes: 0,
    completedQuizzes: 0,
    totalModules: 0,
    completedModules: 0,
    totalMilestones: 0,
    completedMilestones: 0,
    totalScore: 0,
    userScore: 0
  });
  const { fetchData } = useApi();
  const fetchInitiated = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchInitiated.current) return;

    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        fetchInitiated.current = true;

        // Fetch profile data
        const profileResponse = await fetchData(profile, {});
        if (profileResponse.success) {
          setProfileData(profileResponse.data);
        }

        // Fetch enrolled courses from dashboard
        const dashboardResponse = await fetchData(getDashboard, {});

        if (dashboardResponse.success) {
          const enrolledCourses =
            dashboardResponse?.data?.enrolledCourses || [];
          setCourses(enrolledCourses);

          // Fetch detailed data for each course

          const detailedCoursesPromises = enrolledCourses.map((course) =>
            fetchData(getSingleCourse, { data: course.courseId })
          );

          const detailedCoursesResults = await Promise.all(
            detailedCoursesPromises
          );

          const detailedCoursesData = detailedCoursesResults
            .filter((response) => response.success)
            .map((response) => response.data);

          setDetailedCourses(detailedCoursesData);

          // Calculate statistics across all courses
          const stats = detailedCoursesData.reduce(
            (acc, courseData) => {
              const summary = courseData.summary || {};

              return {
                totalVideos: acc.totalVideos + (summary.totalVideos || 0),
                completedVideos:
                  acc.completedVideos + (summary.completedVideos || 0),
                totalWatchTime:
                  acc.totalWatchTime + (summary.totalWatchTime || 0),
                userWatchTime: acc.userWatchTime + (summary.userWatchTime || 0),
                totalQuizzes: acc.totalQuizzes + (summary.totalQuizzes || 0),
                completedQuizzes:
                  acc.completedQuizzes + (summary.completedQuizzes || 0),
                totalModules: acc.totalModules + (summary.totalModules || 0),
                completedModules:
                  acc.completedModules + (summary.completedModules || 0),
                totalMilestones:
                  acc.totalMilestones + (summary.totalMilestones || 0),
                completedMilestones:
                  acc.completedMilestones + (summary.completedMilestones || 0),
                totalScore: acc.totalScore + (summary.totalScore || 0),
                userScore: acc.userScore + (summary.userScore || 0)
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
              completedMilestones: 0,
              totalScore: 0,
              userScore: 0
            }
          );

          setTotalStats(stats);

          // Calculate overall progress
          const progress =
            stats.totalModules > 0
              ? (stats.completedModules / stats.totalModules) * 100
              : 0;

          setOverallProgress(progress);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();

    return () => {
      fetchInitiated.current = false;
    };
  }, []);

  if (isLoading || !profileData) {
    return <LoadingSpinner message='Loading your dashboard...' />;
  }

  return (
    <div className='dashboard p-6 bg-gray-50 min-h-screen pt-20'>
      <div className='max-w-6xl mx-auto'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900 mt-2 mb-4'>
            Welcome Back, {profileData.name}
          </h2>
        </div>

        {/* Overall Progress */}
        <DashboardSummary overallProgress={overallProgress} />

        {/* Stats Cards */}
        <ProgressStats totalStats={totalStats} />

        {/* Progress Charts */}
        <ProgressCharts totalStats={totalStats} />

        {/* Recent Course Activity */}
        <RecentCourseActivity
          courses={detailedCourses.map((courseData) => ({
            ...courseData.course,
            courseData: courseData
          }))}
        />
      </div>
    </div>
  );
}
