import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleCourse } from '@/src/services/course';
import { updateVideoProgress } from '@/src/services/progress';
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
      <h2 className='text-2xl font-bold mb-4 text-left'>
        {selectedItem.milestoneNumber}.{selectedItem.moduleNumber}.
        {selectedItem.itemNumber} -{' '}
        {selectedItem.video?.title || `Quiz ${quizIndex}`}
      </h2>
    );
  };

  // Function to find the next content item
  const findNextContent = () => {
    if (!course || !selectedItem) return null;

    let foundCurrent = false;
    let nextItem = null;
    let nextMilestoneNum, nextModuleNum, nextItemNum;

    for (let mIdx = 0; mIdx < course.milestones.length; mIdx++) {
      const milestone = course.milestones[mIdx];
      const milestoneNum = mIdx + 1;

      for (let modIdx = 0; modIdx < milestone.modules.length; modIdx++) {
        const module = milestone.modules[modIdx];
        const moduleNum = modIdx + 1;

        for (let itemIdx = 0; itemIdx < module.moduleItems.length; itemIdx++) {
          const item = module.moduleItems[itemIdx];
          const itemNum = itemIdx + 1;

          // If we already found the current item, this is the next one
          if (foundCurrent) {
            nextItem = item;
            nextMilestoneNum = milestoneNum;
            nextModuleNum = moduleNum;
            nextItemNum = itemNum;
            return {
              item: nextItem,
              milestoneNum: nextMilestoneNum,
              moduleNum: nextModuleNum,
              itemNum: nextItemNum
            };
          }

          // Check if this is the current item
          if (
            selectedItem.video?.id === item.video?.id ||
            (selectedItem.quiz?.id && selectedItem.quiz?.id === item.quiz?.id)
          ) {
            foundCurrent = true;
          }
        }
      }
    }

    return null; // No next item found (we're at the end)
  };

  // Function to handle marking as complete and navigating to the next content
  const handleMarkCompletedAndNext = async () => {
    // If it's a video, mark it as completed
    if (selectedItem.video) {
      try {
        await fetchData(updateVideoProgress, {
          videoId: selectedItem.video.id,
          isCompleted: true,
          timeWatched: 0
        });
      } catch (error) {
        console.error('[CoursePage] Error updating video progress:', error);
      }
    }

    // Find and navigate to the next content
    const nextContent = findNextContent();
    if (nextContent) {
      // Update module/milestone panels if needed
      const nextModule =
        course.milestones[nextContent.milestoneNum - 1].modules[
          nextContent.moduleNum - 1
        ];
      const nextMilestone = course.milestones[nextContent.milestoneNum - 1];

      // Ensure the milestone is open
      if (!openMilestones[nextMilestone.id]) {
        setOpenMilestones((prev) => ({
          ...prev,
          [nextMilestone.id]: true
        }));
      }

      // Ensure the module is open
      if (!openModules[nextModule.id]) {
        setOpenModules((prev) => ({
          ...prev,
          [nextModule.id]: true
        }));
      }

      // Select the next item
      handleItemSelect(
        nextContent.item,
        nextContent.milestoneNum,
        nextContent.moduleNum,
        nextContent.itemNum
      );
    }
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
            <div className='mt-4 mb-8'>
              <button
                onClick={handleMarkCompletedAndNext}
                className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center'
              >
                Mark Completed and Next
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 ml-2'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            <NotesSection videoId={selectedItem.video.id} />
            <CommentsSection videoId={selectedItem.video.id} />
          </>
        )}
        {selectedItem.quiz && (
          <>
            <QuizSection quiz={selectedItem.quiz.id} />
            <div className='mt-4 mb-8'>
              <button
                onClick={handleMarkCompletedAndNext}
                className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded flex items-center'
              >
                Continue to Next
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 ml-2'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </>
        )}
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
