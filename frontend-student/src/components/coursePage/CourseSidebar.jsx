import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MilestoneItem from './MilestoneItem';
import { checkVideo } from '@/src/services/video';
import { getQuiz } from '@/src/services/quiz';
import useApi from '@/src/hooks/useApi';

export default function CourseSidebar({
  course,
  selectedItem,
  openMilestones,
  openModules,
  toggleMilestone,
  toggleModule,
  handleItemSelect,
  resumeData
}) {
  const { fetchData } = useApi();
  const [firstLockedItemId, setFirstLockedItemId] = useState(null);
  const [unlockableItems, setUnlockableItems] = useState({});

  // Get item progress based on type
  const getItemProgress = async (item) => {
    if (item.video) {
      const videoData = await fetchData(checkVideo, {
        videoId: item.video.id
      });
      return videoData?.data?.progress;
    }

    if (item.quiz) {
      const quizData = await fetchData(getQuiz, {
        quizId: item.quiz.id
      });
      return quizData?.data?.progress;
    }

    return null;
  };

  // Find the module and its first item
  const findModuleAndFirstItem = () => {
    const milestone = course?.milestones?.find(
      (m) => m.id === resumeData.nextMilestoneId
    );
    if (!milestone) return { module: null, firstItem: null };

    const module = milestone?.modules?.find(
      (m) => m.id === resumeData.nextModuleId
    );
    if (!module || !module.moduleItems || module.moduleItems.length === 0) {
      return { module: null, firstItem: null };
    }

    return { module, firstItem: module.moduleItems[0] };
  };

  // Process the first item in the module
  const processFirstItem = async (firstItem) => {
    const progress = await getItemProgress(firstItem);
    const result = { unlockable: {}, foundLocked: false };

    if (progress === null) {
      setFirstLockedItemId(firstItem.id);
      result.unlockable[firstItem.id] = true;
      result.foundLocked = true;
    } else {
      result.unlockable[firstItem.id] = true;
    }

    return result;
  };

  // Process remaining items in the module
  const processRemainingItems = async (module, result) => {
    if (result.foundLocked) return result.unlockable;

    for (let i = 1; i < module.moduleItems.length; i++) {
      const item = module.moduleItems[i];
      result.unlockable[item.id] = true;

      if (!result.foundLocked) {
        const progress = await getItemProgress(item);

        if (progress === null) {
          setFirstLockedItemId(item.id);
          result.foundLocked = true;
          break;
        }
      }
    }

    return result.unlockable;
  };

  useEffect(() => {
    if (!resumeData.nextMilestoneId || !resumeData.nextModuleId) return;

    const loadModuleProgress = async () => {
      try {
        const { module, firstItem } = findModuleAndFirstItem();
        if (!module || !firstItem) return;

        const result = await processFirstItem(firstItem);
        const unlockable = await processRemainingItems(module, result);

        setUnlockableItems(unlockable);
      } catch (error) {
        console.error('Error loading module progress:', error);
      }
    };

    loadModuleProgress();
  }, [resumeData, course]);

  return (
    <nav
      className='bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 overflow-auto max-h-[calc(100vh-180px)]'
      aria-label='Course content navigation'
    >
      <h2 className='text-lg font-semibold mb-4'>Course Content</h2>

      {course.milestones.map((milestone, index) => (
        <MilestoneItem
          key={milestone.id}
          milestone={milestone}
          mIndex={index}
          openMilestones={openMilestones}
          openModules={openModules}
          toggleMilestone={toggleMilestone}
          toggleModule={toggleModule}
          handleItemSelect={handleItemSelect}
          selectedItem={selectedItem}
          firstLockedItemId={firstLockedItemId}
          currentMilestoneId={resumeData.nextMilestoneId}
          currentModuleId={resumeData.nextModuleId}
          unlockableItems={unlockableItems}
        />
      ))}
    </nav>
  );
}

CourseSidebar.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    milestones: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  selectedItem: PropTypes.object,
  openMilestones: PropTypes.object.isRequired,
  openModules: PropTypes.object.isRequired,
  toggleMilestone: PropTypes.func.isRequired,
  toggleModule: PropTypes.func.isRequired,
  handleItemSelect: PropTypes.func.isRequired,
  resumeData: PropTypes.shape({
    nextMilestoneId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nextModuleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    firstLockedItemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};
