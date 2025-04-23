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
      // First get the full course data
      const response = await fetchData(getSingleCourse, { courseId });

      if (response.success) {
        setCourse(response.data);

        // Then get the continuation data
        const continueResponse = await fetchData(getContinueCourse, {
          courseId
        });
        console.log('Continue Response:', continueResponse);

        if (continueResponse.success && continueResponse.data) {
          const progress = continueResponse.data.progress;
          setCourseProgress(progress);

          // Store the next milestone and module IDs from progress data
          setResumeData({
            nextMilestoneId: progress.nextMilestone,
            nextModuleId: progress.nextModule,
            firstLockedItemId: null // Will be set later
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
              // Open this module in the sidebar
              setOpenModules((prev) => ({
                ...prev,
                [progress.nextModule]: true
              }));

              const module = milestone.modules[moduleIndex];

              // Find the specific module item to resume from using nextModuleItem
              if (module.moduleItems && module.moduleItems.length > 0) {
                let resumeItemIndex = 0;

                // If we have a nextModuleItem, find its index in the module items
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
        } else {
          // If no progress data, start from the beginning
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

  // Helper function to initialize with the first item
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

      // For a new course, set the first item as the resume point
      setResumeData({
        nextMilestoneId: firstMilestone.id,
        nextModuleId: firstModule.id,
        firstLockedItemId: null // Will be determined later
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

  // Calculate total content count for course progress
  const calculateTotalContentCount = () => {
    if (!course) return 0;

    let count = 0;
    course.milestones.forEach((milestone) => {
      milestone.modules.forEach((module) => {
        count += module.moduleItems.length;
      });
    });

    return count;
  };

  // Function to find the next content item
  const findNextContent = () => {
    if (!course || !selectedItem) return null;

    let foundCurrent = false;
    let nextItem = null;
    let nextMilestoneNum, nextModuleNum, nextItemNum;
    let currentMilestoneId, currentModuleId;

    // Find current milestone and module
    const currentMilestone =
      course.milestones[selectedItem.milestoneNumber - 1];
    const currentModule =
      currentMilestone?.modules[selectedItem.moduleNumber - 1];

    currentMilestoneId = currentMilestone?.id;
    currentModuleId = currentModule?.id;

    for (let mIdx = 0; mIdx < course.milestones.length; mIdx++) {
      const milestone = course.milestones[mIdx];
      const milestoneNum = mIdx + 1;

      for (let modIdx = 0; modIdx < milestone.modules.length; modIdx++) {
        const module = milestone.modules[modIdx];
        const moduleNum = modIdx + 1;

        for (let itemIdx = 0; itemIdx < module.moduleItems.length; itemIdx++) {
          const item = module.moduleItems[itemIdx];
          const itemNum = itemIdx + 1;

          // Check if this is the current item
          if (
            selectedItem.id === item.id ||
            selectedItem.video?.id === item.video?.id ||
            (selectedItem.quiz?.id && selectedItem.quiz?.id === item.quiz?.id)
          ) {
            foundCurrent = true;

            // Check if this is the last item in the module
            if (itemIdx === module.moduleItems.length - 1) {
              // Mark that we need to complete this module
              console.log('[CoursePage] Last item in module detected');
            }

            // Move to the next item
            continue;
          }

          // If we already found the current item, this is the next one
          else if (foundCurrent) {
            nextItem = item;
            nextMilestoneNum = milestoneNum;
            nextModuleNum = moduleNum;
            nextItemNum = itemNum;
            return {
              item: nextItem,
              milestoneNum: nextMilestoneNum,
              moduleNum: nextModuleNum,
              itemNum: nextItemNum,
              currentMilestoneId,
              currentModuleId
            };
          }
        }
      }
    }

    // If we found the current but no next, we've reached the end of the course
    if (foundCurrent) {
      return {
        isEndOfCourse: true,
        currentMilestoneId,
        currentModuleId
      };
    }

    return null; // No next item found (and current not found)
  };

  // Function to check if the current item is the last one in its module
  const isLastItemInModule = () => {
    if (!course || !selectedItem) return false;

    const currentMilestone =
      course.milestones[selectedItem.milestoneNumber - 1];
    const currentModule =
      currentMilestone?.modules[selectedItem.moduleNumber - 1];

    if (!currentModule || !currentModule.moduleItems) return false;

    return selectedItem.itemNumber === currentModule.moduleItems.length;
  };

  // Function to check if the current module is the last one in its milestone
  const isLastModuleInMilestone = () => {
    if (!course || !selectedItem) return false;

    const currentMilestone =
      course.milestones[selectedItem.milestoneNumber - 1];

    if (!currentMilestone || !currentMilestone.modules) return false;

    return selectedItem.moduleNumber === currentMilestone.modules.length;
  };

  // Function to check if the current milestone is the last one in the course
  const isLastMilestoneInCourse = () => {
    if (!course || !selectedItem) return false;

    return selectedItem.milestoneNumber === course.milestones.length;
  };

  // Function to handle progression through the course
  const handleCourseProgression = async () => {
    try {
      const currentMilestone =
        course.milestones[selectedItem.milestoneNumber - 1];
      const currentModule =
        currentMilestone?.modules[selectedItem.moduleNumber - 1];

      const isLastItem = isLastItemInModule();
      const isLastModule = isLastModuleInMilestone();
      const isLastMilestone = isLastMilestoneInCourse();

      console.log(
        `[CoursePage] Progression: Last Item? ${isLastItem}, Last Module? ${isLastModule}, Last Milestone? ${isLastMilestone}`
      );

      // If this is the last item in the module, mark module as completed
      if (isLastItem) {
        await fetchData(updateModuleProgress, {
          moduleId: currentModule.id,
          isCompleted: true
        });
        console.log(
          `[CoursePage] Module ${currentModule.id} marked as completed`
        );

        // If this is also the last module in the milestone, mark milestone as completed
        if (isLastModule) {
          await fetchData(updateMilestoneProgress, {
            milestoneId: currentMilestone.id,
            isCompleted: true
          });
          console.log(
            `[CoursePage] Milestone ${currentMilestone.id} marked as completed`
          );

          // If this is also the last milestone in the course, mark course as completed
          if (isLastMilestone) {
            await fetchData(updateCourseProgress, {
              courseId,
              isCompleted: true,
              progress: calculateTotalContentCount()
            });
            console.log(`[CoursePage] Course ${courseId} marked as completed`);
            setShowCompletionModal(true);
            return true; // Return true to indicate course completion
          }
        }
      }

      // Refresh the course progress data
      const progressResponse = await fetchData(getContinueCourse, {
        courseId
      });

      if (progressResponse.success) {
        const updatedProgress = progressResponse.data.progress;
        setCourseProgress(updatedProgress);

        // Update resume data with new next milestone and module IDs
        setResumeData({
          nextMilestoneId: updatedProgress.nextMilestone,
          nextModuleId: updatedProgress.nextModule,
          nextModuleItem: updatedProgress.nextModuleItem
        });
      }

      return false; // Return false to indicate course is not yet completed
    } catch (error) {
      console.error('[CoursePage] Error in handleCourseProgression:', error);
      return false;
    }
  };

  // Function to handle marking as complete and navigating to the next content
  const handleMarkCompletedAndNext = async () => {
    try {
      // Mark the current item as completed
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

      // Handle course progression (marking modules/milestones/course as completed)
      const isCourseCompleted = await handleCourseProgression();

      if (isCourseCompleted) {
        // Course is completed, modal will be shown by handleCourseProgression
        return;
      }

      // Find the next content to navigate to
      const nextContent = findNextContent();

      if (!nextContent) {
        console.error('[CoursePage] Could not determine next content');
        return;
      }

      // Handle end of course scenario
      if (nextContent.isEndOfCourse) {
        setShowCompletionModal(true);
        return;
      }

      // Navigate to the next content
      if (nextContent.item) {
        // Update module/milestone panels if needed
        const nextMilestone = course.milestones[nextContent.milestoneNum - 1];
        const nextModule = nextMilestone.modules[nextContent.moduleNum - 1];

        // Ensure the milestone is open
        setOpenMilestones((prev) => ({
          ...prev,
          [nextMilestone.id]: true
        }));

        // Ensure the module is open
        setOpenModules((prev) => ({
          ...prev,
          [nextModule.id]: true
        }));

        // Select the next item
        handleItemSelect(
          nextContent.item,
          nextContent.milestoneNum,
          nextContent.moduleNum,
          nextContent.itemNum
        );
      }
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
