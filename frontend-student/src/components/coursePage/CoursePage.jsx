import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleCourse, getContinueCourse } from '@/src/services/course';
import {
  updateVideoProgress,
  updateMilestoneProgress,
  updateModuleProgress,
  updateCourseProgress
} from '@/src/services/progress';
import CourseSidebar from './CourseSidebar';
import useApi from '@/src/hooks/useApi';
import CourseContent from './CourseContent';
import CourseCompletionModal from './CourseCompletionModal';
import QuizCompletionModal from './QuizCompletionModal';
import { getQuiz } from '@/src/services/quiz';
import { updateQuizProgress } from '@/src/services/progress';

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openMilestones, setOpenMilestones] = useState({});
  const [openModules, setOpenModules] = useState({});
  const { fetchData } = useApi();
  const hasFetched = useRef(false);
  const [courseProgress, setCourseProgress] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [resumeData, setResumeData] = useState({
    nextMilestoneId: null,
    nextModuleId: null,
    firstLockedItemId: null
  });

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

        const continueResponse = await fetchData(getContinueCourse, {
          courseId
        });
        console.log('Continue Response:', continueResponse);

        if (continueResponse.success && continueResponse.data) {
          const progress = continueResponse.data.progress;

          setCourseProgress(progress);

          // Handle case where all modules are completed (nextMilestone, nextModule, nextContent all null)
          if (
            !progress.nextMilestone &&
            !progress.nextModule &&
            !progress.nextModuleItem
          ) {
            const lastMilestone =
              response.data.milestones[response.data.milestones.length - 1];
            const lastModule =
              lastMilestone.modules[lastMilestone.modules.length - 1];
            const lastItem =
              lastModule.moduleItems[lastModule.moduleItems.length - 1];

            // Open all milestones and modules since everything is completed
            const allMilestonesOpen = {};
            const allModulesOpen = {};

            response.data.milestones.forEach((milestone) => {
              allMilestonesOpen[milestone.id] = true;
              milestone.modules.forEach((module) => {
                allModulesOpen[module.id] = true;
              });
            });

            setOpenMilestones(allMilestonesOpen);
            setOpenModules(allModulesOpen);

            setSelectedItem({
              ...lastItem,
              milestoneNumber: response.data.milestones.length,
              moduleNumber: lastMilestone.modules.length,
              itemNumber: lastModule.moduleItems.length
            });

            setResumeData({
              nextMilestoneId: null,
              nextModuleId: null,
              firstLockedItemId: null
            });
          } else {
            setResumeData({
              nextMilestoneId: progress.nextMilestone,
              nextModuleId: progress.nextModule,
              firstLockedItemId: null
            });

            // Find the milestone and module to resume from
            const milestoneIndex = response.data.milestones.findIndex(
              (m) => m.id === progress.nextMilestone
            );

            if (milestoneIndex !== -1) {
              // Open this milestone in the sidebar
              setOpenMilestones((prev) => ({
                ...prev,
                [progress.nextMilestone]: true
              }));

              const milestone = response.data.milestones[milestoneIndex];
              const moduleIndex = milestone.modules.findIndex(
                (m) => m.id === progress.nextModule
              );

              if (moduleIndex !== -1) {
                setOpenModules((prev) => ({
                  ...prev,
                  [progress.nextModule]: true
                }));

                const module = milestone.modules[moduleIndex];

                if (module.moduleItems && module.moduleItems.length > 0) {
                  let resumeItemIndex = 0;

                  if (progress.nextModuleItem) {
                    const itemIndex = module.moduleItems.findIndex(
                      (item) => item.id === progress.nextModuleItem
                    );

                    if (itemIndex !== -1) {
                      resumeItemIndex = itemIndex;
                    }
                  }

                  const resumeItem = module.moduleItems[resumeItemIndex];

                  setSelectedItem({
                    ...resumeItem,
                    milestoneNumber: milestoneIndex + 1,
                    moduleNumber: moduleIndex + 1,
                    itemNumber: resumeItemIndex + 1
                  });
                }
              }
            }
          }
        } else {
          initializeWithFirstItem(response.data);
        }
      }
    } catch (error) {
      console.error('[CoursePage] Error fetching course details:', error);
      if (course) {
        initializeWithFirstItem(course);
      }
    } finally {
      setLoading(false);
    }
  };

  const initializeWithFirstItem = (courseData) => {
    if (
      !courseData ||
      !courseData.milestones ||
      courseData.milestones.length === 0
    )
      return;

    const firstMilestone = courseData.milestones[0];
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

      setResumeData({
        nextMilestoneId: firstMilestone.id,
        nextModuleId: firstModule.id,
        firstLockedItemId: null
      });
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

  const handleMarkCompletedAndNext = async () => {
    try {
      if (selectedItem.video) {
        await fetchData(updateVideoProgress, {
          videoId: selectedItem.video.id,
          isCompleted: true,
          timeWatched: 0
        });
      } else if (selectedItem.quiz) {
        const quiz_response = await fetchData(getQuiz, {
          quizId: selectedItem.quiz.id
        });
        if (quiz_response.data.progress == null) {
          setShowQuizModal(true);
          return;
        } else if (quiz_response.data.progress !== null) {
          await fetchData(updateQuizProgress, {
            quizId: selectedItem.quiz.id,
            isCompleted: true,
            score: quiz_response.data.progress.QuizProgress.score
          });
        }
      }

      fetchCourseData();
    } catch (error) {
      console.error('[CoursePage] Error in handleMarkCompletedAndNext:', error);
    }
  };

  if (loading) return <p className='text-center text-lg'>Loading course...</p>;
  if (!course)
    return <p className='text-center text-red-500'>Course not found.</p>;

  return (
    <div className='max-w-6xl mx-auto py-8 mt-16'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          <CourseContent
            selectedItem={selectedItem}
            handleMarkCompletedAndNext={handleMarkCompletedAndNext}
          />
        </div>

        <CourseSidebar
          course={course}
          selectedItem={selectedItem}
          openMilestones={openMilestones}
          openModules={openModules}
          toggleMilestone={toggleMilestone}
          toggleModule={toggleModule}
          handleItemSelect={handleItemSelect}
          resumeData={resumeData}
        />
      </div>

      <CourseCompletionModal
        showModal={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
      />

      <QuizCompletionModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
      />
    </div>
  );
}
