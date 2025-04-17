// src/components/courseManagement/ContentList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { getCourseById } from '@/src/services/getCourse';
import { checkMilestone } from '@/src/services/milestone';
import { checkModule } from '@/src/services/module';

const ContentList = ({
  moduleId,
  refreshTrigger,
  onEditItem,
  onDeleteItem
}) => {
  const [moduleItems, setModuleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moduleTitle, setModuleTitle] = useState('');
  const [milestoneId, setMilestoneId] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        // First, find the module data to get the milestoneId
        const moduleResult = await fetchData(checkModule, { moduleId });
        const milestoneResult = await fetchData(checkMilestone, {
          milestoneId: moduleResult.data.milestoneId
        });

        const courseId = milestoneResult.data.courseId;
        setMilestoneId(moduleResult.data.milestoneId);

        const result = await fetchData(getCourseById, { courseId });
        console.log('Result ', result);

        if (result.success) {
          // Search through all milestones and modules to find the one with our moduleId
          const course = result.data;
          let foundModule = null;

          for (const milestone of course.milestones) {
            const module = milestone.modules.find((m) => m.id === moduleId);
            if (module) {
              foundModule = module;
              break;
            }
          }

          if (foundModule) {
            setModuleTitle(foundModule.title);

            // Set the combined array of module items
            const items = foundModule.moduleItems || [];
            items.sort((a, b) => a.order - b.order); // Ensure items are in order
            setModuleItems(items);
          } else {
            console.error('Module not found in course data');
            setModuleItems([]);
          }
        } else {
          console.error('Failed to load course data:', result.message);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [refreshTrigger]);

  // Count quizzes for numbering
  const getQuizNumber = (index) => {
    let quizCount = 0;
    for (let i = 0; i <= index; i++) {
      if (moduleItems[i].quiz) {
        quizCount++;
      }
    }
    return quizCount;
  };

  if (loading) {
    return <div className='text-center py-4'>Loading content...</div>;
  }

  if (moduleItems.length === 0) {
    return (
      <div className='text-center py-4'>
        No content found. Add videos or quizzes using the buttons above.
      </div>
    );
  }

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Content for {moduleTitle}</h2>

      <div className='space-y-4'>
        {moduleItems.map((item, index) => (
          <div
            key={item.id}
            className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'
          >
            {item.video ? (
              <h4 className='text-lg font-medium'>{item.video.title}</h4>
            ) : (
              <h4 className='text-lg font-medium'>
                Quiz {getQuizNumber(index)}
              </h4>
            )}

            <div className='flex space-x-2'>
              <button
                onClick={() => onEditItem(item)}
                className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Edit
              </button>

              <button
                onClick={() => onDeleteItem(item)}
                className='px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentList;
