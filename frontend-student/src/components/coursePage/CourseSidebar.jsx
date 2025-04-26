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

  useEffect(() => {
    if (!resumeData.nextMilestoneId || !resumeData.nextModuleId) return;

    const loadModuleProgress = async () => {
      try {
        const milestone = course?.milestones?.find(
          (m) => m.id === resumeData.nextMilestoneId
        );
        if (!milestone) return;

        const module = milestone?.modules?.find(
          (m) => m.id === resumeData.nextModuleId
        );
        if (!module || !module.moduleItems || module.moduleItems.length === 0)
          return;

        const firstItem = module.moduleItems[0];

        let firstItemProgress = null;

        if (firstItem.video) {
          const videoData = await fetchData(checkVideo, {
            videoId: firstItem.video.id
          });
          firstItemProgress = videoData?.data?.progress;
        } else if (firstItem.quiz) {
          const quizData = await fetchData(getQuiz, {
            quizId: firstItem.quiz.id
          });
          firstItemProgress = quizData?.data?.progress;
        }

        const unlockable = {};
        let foundFirstLocked = false;

        if (firstItemProgress === null) {
          setFirstLockedItemId(firstItem.id);
          unlockable[firstItem.id] = true;
          foundFirstLocked = true;
        } else {
          let foundIncompleteItem = false;

          for (let i = 0; i < module.moduleItems.length; i++) {
            const item = module.moduleItems[i];

            if (!foundIncompleteItem) {
              unlockable[item.id] = true;
            }

            if (!foundFirstLocked && i > 0) {
              let itemProgress = null;

              if (item.video) {
                const videoData = await fetchData(checkVideo, {
                  videoId: item.video.id
                });
                itemProgress = videoData?.data?.progress;
              } else if (item.quiz) {
                const quizData = await fetchData(getQuiz, {
                  quizId: item.quiz.id
                });
                itemProgress = quizData?.data?.progress;
              }

              if (itemProgress === null) {
                setFirstLockedItemId(item.id);
                unlockable[item.id] = true;
                foundFirstLocked = true;
                foundIncompleteItem = true;
              }
            }
          }
        }

        setUnlockableItems(unlockable);
      } catch (error) {
        console.error('Error loading module progress:', error);
      }
    };

    loadModuleProgress();
  }, [resumeData, course]);

  return (
    <div className='bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 overflow-auto max-h-[calc(100vh-180px)]'>
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
    </div>
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
