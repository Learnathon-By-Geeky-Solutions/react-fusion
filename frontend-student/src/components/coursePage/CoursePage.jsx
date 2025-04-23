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

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchCourseData();
  }, []);

  // Fixed function to find and return the next item to display
  const findNextItemToDisplay = (courseData, progress) => {
    if (!courseData || !progress) return null;

    const { nextMilestone, nextModule, nextModuleItem } = progress;
    console.log(
      'Finding next item to display with progress data:',
      nextMilestone,
      nextModule,
      nextModuleItem
    );

    // Find the milestone with the specified ID
    const milestoneIndex = courseData.milestones.findIndex(
      (m) => m.id === nextMilestone
    );
    if (milestoneIndex === -1) return null;

    const milestone = courseData.milestones[milestoneIndex];

    // Find the module with the specified ID
    const moduleIndex = milestone.modules.findIndex((m) => m.id === nextModule);
    if (moduleIndex === -1) return null;

    const module = milestone.modules[moduleIndex];

    // If nextModuleItem is null, it means the module is completed
    // In this case, we need to find the first item of the next module
    if (!nextModuleItem) {
      // First try to get the next module in the current milestone
      if (moduleIndex + 1 < milestone.modules.length) {
        const nextMod = milestone.modules[moduleIndex + 1];
        if (nextMod.moduleItems && nextMod.moduleItems.length > 0) {
          return {
            item: nextMod.moduleItems[0],
            milestoneNumber: milestoneIndex + 1,
            moduleNumber: moduleIndex + 2,
            itemNumber: 1
          };
        }
      }

      // If no next module in this milestone, try the first module of the next milestone
      if (milestoneIndex + 1 < courseData.milestones.length) {
        const nextMile = courseData.milestones[milestoneIndex + 1];
        if (
          nextMile.modules &&
          nextMile.modules.length > 0 &&
          nextMile.modules[0].moduleItems &&
          nextMile.modules[0].moduleItems.length > 0
        ) {
          return {
            item: nextMile.modules[0].moduleItems[0],
            milestoneNumber: milestoneIndex + 2,
            moduleNumber: 1,
            itemNumber: 1
          };
        }
      }

      // If we're at the last module of the last milestone
      return null;
    }

    // Find the specific item with the nextModuleItem ID
    const itemIndex = module.moduleItems.findIndex((item) => {
      // Check both video and quiz IDs
      const itemId = item.video?.id || item.quiz?.id;
      return itemId === nextModuleItem;
    });

    // If we found the item, return it with its position
    if (itemIndex !== -1) {
      return {
        item: module.moduleItems[itemIndex],
        milestoneNumber: milestoneIndex + 1,
        moduleNumber: moduleIndex + 1,
        itemNumber: itemIndex + 1
      };
    }

    // If we can't find the specific item, return the first item in the module
    if (module.moduleItems && module.moduleItems.length > 0) {
      return {
        item: module.moduleItems[0],
        milestoneNumber: milestoneIndex + 1,
        moduleNumber: moduleIndex + 1,
        itemNumber: 1
      };
    }

    return null;
  };

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
          setCourseProgress(continueResponse.data.progress);

          // Find the next item to display
          const nextItem = findNextItemToDisplay(
            response.data,
            continueResponse.data.progress
          );
          console.log('Next item to display:', nextItem);

          if (nextItem) {
            // Open the corresponding milestone and module in the sidebar
            if (response.data.milestones[nextItem.milestoneNumber - 1]) {
              const milestoneId =
                response.data.milestones[nextItem.milestoneNumber - 1].id;
              setOpenMilestones((prev) => ({ ...prev, [milestoneId]: true }));
            }

            if (
              response.data.milestones[nextItem.milestoneNumber - 1]?.modules[
                nextItem.moduleNumber - 1
              ]
            ) {
              const moduleId =
                response.data.milestones[nextItem.milestoneNumber - 1].modules[
                  nextItem.moduleNumber - 1
                ].id;
              setOpenModules((prev) => ({ ...prev, [moduleId]: true }));
            }

            // Set the selected item
            setSelectedItem({
              ...nextItem.item,
              milestoneNumber: nextItem.milestoneNumber,
              moduleNumber: nextItem.moduleNumber,
              itemNumber: nextItem.itemNumber
            });
          } else {
            // Fallback to the first item if we can't find the next item
            initializeWithFirstItem(response.data);
          }
        } else {
          // If no progress data, start from the beginning
          initializeWithFirstItem(response.data);
        }
      }
    } catch (error) {
      console.error('[CoursePage] Error fetching course details:', error);
      // Even if there's an error, try to show something
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
            selectedItem.video?.id === item.video?.id ||
            (selectedItem.quiz?.id && selectedItem.quiz?.id === item.quiz?.id)
          ) {
            foundCurrent = true;
            currentMilestoneId = milestone.id;
            currentModuleId = module.id;

            // Check if this is the last item in the module
            const isLastItemInModule =
              itemIdx === module.moduleItems.length - 1;

            // If it's the last item, we'll need to mark module as completed
            if (isLastItemInModule) {
              // We'll handle this in handleMarkCompletedAndNext
            }
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

  // Function to handle marking as complete and navigating to the next content
  const handleMarkCompletedAndNext = async () => {
    try {
      // Mark current item as completed if it's a video
      if (selectedItem.video) {
        await fetchData(updateVideoProgress, {
          videoId: selectedItem.video.id,
          isCompleted: true,
          timeWatched: 0
        });
      }

      // Find the next content
      const nextContent = findNextContent();

      if (!nextContent) {
        console.error('[CoursePage] Could not determine next content');
        return;
      }

      // If the next item is in a different module or we've reached the end of the course,
      // mark the current module as completed
      if (
        nextContent.isEndOfCourse ||
        nextContent.item?.milestoneNum !== selectedItem.milestoneNumber ||
        nextContent.item?.moduleNum !== selectedItem.moduleNumber
      ) {
        // Mark the current module as completed
        await fetchData(updateModuleProgress, {
          moduleId: nextContent.currentModuleId,
          isCompleted: true
        });

        console.log('[CoursePage] Module marked as completed');

        // Fetch the updated progress data
        const progressResponse = await fetchData(getContinueCourse, {
          courseId
        });

        if (progressResponse.success) {
          const updatedProgress = progressResponse.data.progress;
          setCourseProgress(updatedProgress);

          // Check if the milestone is completed (nextModule is null)
          if (!updatedProgress.nextModule) {
            // Mark milestone as completed
            await fetchData(updateMilestoneProgress, {
              milestoneId: nextContent.currentMilestoneId,
              isCompleted: true
            });

            console.log('[CoursePage] Milestone marked as completed');

            // Fetch updated progress again after marking milestone as completed
            const finalProgressResponse = await fetchData(getContinueCourse, {
              courseId
            });

            if (finalProgressResponse.success) {
              const finalProgress = finalProgressResponse.data.progress;
              setCourseProgress(finalProgress);

              // Check if the course is completed (nextMilestone is null)
              if (!finalProgress.nextMilestone) {
                // Mark course as completed
                await fetchData(updateCourseProgress, {
                  courseId,
                  isCompleted: true,
                  progress: calculateTotalContentCount()
                });

                console.log('[CoursePage] Course marked as completed');
              }
            }
          }
        }
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
        />
      </div>

      <CourseCompletionModal
        showModal={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
      />
    </div>
  );
}
