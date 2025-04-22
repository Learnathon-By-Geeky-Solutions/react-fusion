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
      const progressResponse = await fetchData(getContinueCourse, { courseId });

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
