import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleCourse } from '@/src/services/course';
import VideoSection from './VideoSection';
import CourseSidebar from './CourseSidebar';
import QuizSection from './QuizSection';
import useApi from '@/src/hooks/useApi';
import NotesSection from './NotesSection';
import CommentsSection from './CommentsSection';

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openMilestones, setOpenMilestones] = useState({});
  const [openModules, setOpenModules] = useState({});
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
      console.log('CourseId', courseId);

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
          <>
            <VideoSection
              videoId={selectedItem.video.id}
              title={selectedItem.video.title}
            />
            <NotesSection videoId={selectedItem.video.id} />

            <CommentsSection videoId={selectedItem.video.id} />
          </>
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
    </div>
  );
}
