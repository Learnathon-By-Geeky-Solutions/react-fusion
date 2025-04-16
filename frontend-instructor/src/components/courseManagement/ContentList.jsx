// src/components/ContentManagement/ContentList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import { getCourseById } from '@/src/services/getCourse';
import { checkMilestone } from '@/src/services/milestone';
import { checkModule } from '@/src/services/module';

const ContentList = ({ moduleId, refreshTrigger }) => {
  const [videos, setVideos] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moduleTitle, setModuleTitle] = useState('');
  const { fetchData } = useApi();

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        // First, find the module data to get the milestoneId
        let milestoneId = null;
        let foundModule = null;

        // Get all courses (or the specific course if you have the courseId)
        const result_1 = await fetchData(checkModule, { moduleId });
        const result_2 = await fetchData(checkMilestone, {
          milestoneId: result_1.data.milestoneId
        });
        const courseId = result_2.data.courseId;
        const result = await fetchData(getCourseById, { courseId });

        if (result.success) {
          // Search through all milestones and modules to find the one with our moduleId
          const course = result.data;

          for (const milestone of course.milestones) {
            const module = milestone.modules.find((m) => m.id === moduleId);
            if (module) {
              milestoneId = milestone.id;
              foundModule = module;
              break;
            }
          }

          if (foundModule) {
            setModuleTitle(foundModule.title);
            setVideos(foundModule.videos || []);
            setQuizes(foundModule.quizes || []);
          } else {
            console.error('Module not found in course data');
            setVideos([]);
            setQuizes([]);
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
  }, [refreshTrigger, moduleId]);

  if (loading) {
    return <div className='text-center py-4'>Loading content...</div>;
  }

  if (videos.length === 0 && quizes.length === 0) {
    return (
      <div className='text-center py-4'>
        No content found. Add videos or quizzes using the buttons above.
      </div>
    );
  }

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold mb-4'>Content for {moduleTitle}</h2>

      {videos.length > 0 && (
        <div className='mb-8'>
          <h3 className='text-xl font-semibold mb-4'>Videos</h3>
          <div className='space-y-4'>
            {videos.map((video, index) => (
              <div
                key={video.id}
                className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'
              >
                <h4 className='text-lg font-medium'>{video.title}</h4>
                <div className='flex'>
                  <Link
                    to={`/video/${video.id}/edit`}
                    className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {quizes.length > 0 && (
        <div>
          <h3 className='text-xl font-semibold mb-4'>Quizzes</h3>
          <div className='space-y-4'>
            {quizes.map((quiz, index) => (
              <div
                key={quiz.id}
                className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center'
              >
                <h4 className='text-lg font-medium'>Quiz {index + 1}</h4>
                <div className='flex'>
                  <Link
                    to={`/quiz/${quiz.id}/edit`}
                    className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentList;
