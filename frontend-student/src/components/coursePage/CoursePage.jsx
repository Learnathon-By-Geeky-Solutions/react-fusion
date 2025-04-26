import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleCourse, getContinueCourse } from '@/src/services/course';
import {
  updateVideoProgress,
  updateQuizProgress
} from '@/src/services/progress';
import CourseSidebar from './CourseSidebar';
import useApi from '@/src/hooks/useApi';
import CourseContent from './CourseContent';
import CourseCompletionModal from './CourseCompletionModal';
import QuizCompletionModal from './QuizCompletionModal';
import { getQuiz } from '@/src/services/quiz';

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openMilestones, setOpenMilestones] = useState({});
  const [openModules, setOpenModules] = useState({});
  const { fetchData } = useApi();
  const hasFetched = useRef(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);
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

  // Helper functions to extract logic from fetchCourseData
  const handleCompletedCourse = (courseData) => {
    const lastMilestone =
      courseData.milestones[courseData.milestones.length - 1];
    const lastModule = lastMilestone.modules[lastMilestone.modules.length - 1];
    const lastItem = lastModule.moduleItems[lastModule.moduleItems.length - 1];

    const allMilestonesOpen = {};
    const allModulesOpen = {};

    courseData.milestones.forEach((milestone) => {
      allMilestonesOpen[milestone.id] = true;
      milestone.modules.forEach((module) => {
        allModulesOpen[module.id] = true;
      });
    });

    setOpenMilestones(allMilestonesOpen);
    setOpenModules(allModulesOpen);

    setSelectedItem({
      ...lastItem,
      milestoneNumber: courseData.milestones.length,
      moduleNumber: lastMilestone.modules.length,
      itemNumber: lastModule.moduleItems.length
    });

    setResumeData({
      nextMilestoneId: null,
      nextModuleId: null,
      firstLockedItemId: null
    });
  };

  const handleInProgressCourse = (courseData, progress) => {
    setResumeData({
      nextMilestoneId: progress.nextMilestone,
      nextModuleId: progress.nextModule,
      firstLockedItemId: null
    });

    const milestoneIndex = courseData.milestones.findIndex(
      (m) => m.id === progress.nextMilestone
    );

    if (milestoneIndex === -1) return;

    setOpenMilestones((prev) => ({
      ...prev,
      [progress.nextMilestone]: true
    }));

    const milestone = courseData.milestones[milestoneIndex];
    const moduleIndex = milestone.modules.findIndex(
      (m) => m.id === progress.nextModule
    );

    if (moduleIndex === -1) return;

    setOpenModules((prev) => ({
      ...prev,
      [progress.nextModule]: true
    }));

    const module = milestone.modules[moduleIndex];
    if (!module.moduleItems || module.moduleItems.length === 0) return;

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
  };

  const fetchCourseData = async () => {
    try {
      const response = await fetchData(getSingleCourse, { courseId });

      if (!response.success) {
        setLoading(false);
        return;
      }

      setCourse(response.data);
      const continueResponse = await fetchData(getContinueCourse, { courseId });

      if (continueResponse.success && continueResponse.data) {
        const progress = continueResponse.data.progress;
        const isCompleted = !progress.nextMilestone;
        setIsCourseCompleted(isCompleted);

        if (isCompleted) {
          handleCompletedCourse(response.data);
        } else {
          handleInProgressCourse(response.data, progress);
        }
      } else {
        initializeWithFirstItem(response.data);
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

  // Helper functions for navigateToNextItem
  const findCurrentIndices = () => {
    if (!course || !selectedItem) return { allIndices: null };

    let currentIndices = {
      milestoneIndex: -1,
      moduleIndex: -1,
      itemIndex: -1
    };

    for (let i = 0; i < course.milestones.length; i++) {
      const milestone = course.milestones[i];
      for (let j = 0; j < milestone.modules.length; j++) {
        const module = milestone.modules[j];
        for (let k = 0; k < module.moduleItems.length; k++) {
          const item = module.moduleItems[k];
          if (
            (selectedItem.video &&
              item.video &&
              item.video.id === selectedItem.video.id) ||
            (selectedItem.quiz &&
              item.quiz &&
              item.quiz.id === selectedItem.quiz.id)
          ) {
            currentIndices = {
              milestoneIndex: i,
              moduleIndex: j,
              itemIndex: k
            };
            return { allIndices: currentIndices };
          }
        }
      }
    }

    return { allIndices: null };
  };

  const navigateToNextInSameModule = (milestone, module, itemIndex) => {
    const nextItem = module.moduleItems[itemIndex + 1];
    const milestoneIndex = course.milestones.indexOf(milestone);
    const moduleIndex = milestone.modules.indexOf(module);

    setSelectedItem({
      ...nextItem,
      milestoneNumber: milestoneIndex + 1,
      moduleNumber: moduleIndex + 1,
      itemNumber: itemIndex + 2
    });
  };

  const navigateToNextModule = (milestone, moduleIndex) => {
    const nextModule = milestone.modules[moduleIndex + 1];
    const milestoneIndex = course.milestones.indexOf(milestone);

    if (nextModule.moduleItems.length > 0) {
      const nextItem = nextModule.moduleItems[0];
      setSelectedItem({
        ...nextItem,
        milestoneNumber: milestoneIndex + 1,
        moduleNumber: moduleIndex + 2,
        itemNumber: 1
      });
      setOpenModules((prev) => ({
        ...prev,
        [nextModule.id]: true
      }));
    }
  };

  const navigateToNextMilestone = (milestoneIndex) => {
    const nextMilestone = course.milestones[milestoneIndex + 1];

    if (nextMilestone.modules.length > 0) {
      const nextModule = nextMilestone.modules[0];
      if (nextModule.moduleItems.length > 0) {
        const nextItem = nextModule.moduleItems[0];
        setSelectedItem({
          ...nextItem,
          milestoneNumber: milestoneIndex + 2,
          moduleNumber: 1,
          itemNumber: 1
        });
        setOpenMilestones((prev) => ({
          ...prev,
          [nextMilestone.id]: true
        }));
        setOpenModules((prev) => ({
          ...prev,
          [nextModule.id]: true
        }));
      }
    }
  };

  const navigateToNextItem = () => {
    const { allIndices } = findCurrentIndices();
    if (!allIndices) return;

    const { milestoneIndex, moduleIndex, itemIndex } = allIndices;
    const milestone = course.milestones[milestoneIndex];
    const module = milestone.modules[moduleIndex];

    if (itemIndex < module.moduleItems.length - 1) {
      navigateToNextInSameModule(milestone, module, itemIndex);
    } else if (moduleIndex < milestone.modules.length - 1) {
      navigateToNextModule(milestone, moduleIndex);
    } else if (milestoneIndex < course.milestones.length - 1) {
      navigateToNextMilestone(milestoneIndex);
    }
  };

  const handleVideoCompletion = async () => {
    await fetchData(updateVideoProgress, {
      videoId: selectedItem.video.id,
      isCompleted: true,
      timeWatched: 0
    });
  };

  const handleQuizCompletion = async () => {
    const quiz_response = await fetchData(getQuiz, {
      quizId: selectedItem.quiz.id
    });

    if (quiz_response.data.progress == null) {
      setShowQuizModal(true);
      return false;
    }

    await fetchData(updateQuizProgress, {
      quizId: selectedItem.quiz.id,
      isCompleted: true,
      score: quiz_response.data.progress.QuizProgress.score
    });

    return true;
  };

  const checkCourseCompletion = async () => {
    const continueResponse = await fetchData(getContinueCourse, {
      courseId
    });

    if (continueResponse.success && continueResponse.data) {
      const progress = continueResponse.data.progress;
      const isCompleted = !progress.nextMilestone;

      if (isCompleted) {
        setShowCompletionModal(true);
      }
    }
  };

  const handleMarkCompletedAndNext = async () => {
    try {
      if (isCourseCompleted) {
        navigateToNextItem();
        return;
      }

      let shouldContinue = true;

      if (selectedItem.video) {
        await handleVideoCompletion();
      } else if (selectedItem.quiz) {
        shouldContinue = await handleQuizCompletion();
      }

      if (shouldContinue) {
        await checkCourseCompletion();
        fetchCourseData();
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
            isCourseCompleted={isCourseCompleted}
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
