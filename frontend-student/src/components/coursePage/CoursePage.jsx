import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getSingleCourse from '@/src/services/singleCourse';
import { enrollCheck } from '@/src/services/enrolled';
import VideoSection from './VideoSection';
import NotesSection from './NotesSection';
import CommentsSection from './CommentsSection';
import CourseSidebar from './CourseSidebar';
import useApi from '@/src/hooks/useApi';

export default function CoursePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openMilestones, setOpenMilestones] = useState({});
  const [openModules, setOpenModules] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentChecked, setEnrollmentChecked] = useState(false);
  const { fetchData } = useApi();

  useEffect(() => {
    async function checkEnrollment() {
      try {
        const payload = { courseId: id };
        const response = await fetchData(enrollCheck, payload);
        setIsEnrolled(response.success && response.data.enrolled);
        setEnrollmentChecked(true);

        if (!response.success || !response.data.enrolled) {
          alert('You need to enroll in this course first.');
          navigate(`/courses/${id}`);
        }
      } catch (error) {
        console.error('Error checking enrollment status:', error);
        setEnrollmentChecked(true);
        // Redirect on enrollment check error as well
        alert('Unable to verify enrollment. Please try again.');
        navigate(`/courses/${id}`);
      }
    }

    checkEnrollment();
  }, [id, navigate]);

  useEffect(() => {
    async function fetchCourse() {
      if (!enrollmentChecked || !isEnrolled) return;

      try {
        const payload = { id };
        const response = await fetchData(getSingleCourse, payload);
        if (response.success) {
          setCourse(response.data);

          const firstMilestone = response.data.milestones?.[0];
          const firstModule = firstMilestone?.modules?.[0];
          const firstVideo = firstModule?.videos?.[0];

          // Initialize first milestone and module as open
          if (firstMilestone) {
            setOpenMilestones({ [firstMilestone.id]: true });
            if (firstModule) {
              setOpenModules({ [firstModule.id]: true });
            }
          }

          if (firstVideo) {
            const videoWithNumbers = {
              ...firstVideo,
              milestoneNumber: 1,
              moduleNumber: 1,
              videoNumber: 1
            };
            setSelectedVideo(videoWithNumbers);
          }
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id, isEnrolled, enrollmentChecked]);

  const toggleMilestone = (milestoneId) => {
    setOpenMilestones((prev) => ({
      ...prev,
      [milestoneId]: !prev[milestoneId]
    }));
  };

  const toggleModule = (moduleId) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Handle video selection
  const handleVideoSelect = (
    video,
    milestoneNumber,
    moduleNumber,
    videoNumber
  ) => {
    const videoWithNumbers = {
      ...video,
      milestoneNumber,
      moduleNumber,
      videoNumber
    };

    setSelectedVideo(videoWithNumbers);
  };

  if (!enrollmentChecked || loading)
    return <p className='text-center text-lg'>Loading lecture...</p>;
  if (!isEnrolled) return null; // This shouldn't render as we redirect in the useEffect
  if (!course)
    return <p className='text-center text-red-500'>Course not found.</p>;

  return (
    <div className='max-w-[1280px] mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-12'>
      <div className='md:col-span-2'>
        {selectedVideo && (
          <>
            <h1 className='text-2xl font-bold mb-4'>
              {selectedVideo.milestoneNumber}.{selectedVideo.moduleNumber}.
              {selectedVideo.videoNumber} - {selectedVideo.title}
            </h1>

            <VideoSection
              videoId={selectedVideo.id}
              title={selectedVideo.title}
            />

            <NotesSection videoId={selectedVideo.id} />

            <CommentsSection videoId={selectedVideo.id} />
          </>
        )}
      </div>

      <CourseSidebar
        course={course}
        selectedVideo={selectedVideo}
        openMilestones={openMilestones}
        openModules={openModules}
        toggleMilestone={toggleMilestone}
        toggleModule={toggleModule}
        handleVideoSelect={handleVideoSelect}
      />
    </div>
  );
}
