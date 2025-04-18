import useApi from '@/src/hooks/useApi';
import { analyticsService } from '@/src/services/analytics';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CourseAnalytics() {
  const { fetchData } = useApi();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        setIsLoading(true);
        const data = await fetchData(analyticsService.getAnalyticsByCourse, {
          courseId: courseId
        });
        setCourseData(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getAnalytics();
  }, []);

  return (
    <div className='px-4 py-6 mx-auto max-w-7xl'>
      {isLoading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='text-xl text-gray-500'>Loading course data...</div>
        </div>
      ) : (
        <>
          <div className='bg-white shadow-md rounded-lg p-6 my-4 flex justify-between items-center border border-gray-200'>
            <div className='flex-1'>
              <h1 className='text-4xl font-bold text-gray-800 mb-2'>
                {courseData.title}
              </h1>
              <p className='text-gray-600 text-lg'>{courseData.description}</p>
            </div>
          </div>

          <div className='bg-white shadow-md rounded-lg p-6 my-6'>
            <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
              Course Analytics
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
              <div className='bg-blue-50 p-5 rounded-xl shadow-sm flex justify-between items-center border border-blue-100'>
                <h3 className='text-xl font-medium text-gray-700'>Price</h3>
                <span className='text-xl font-bold text-blue-600'>
                  ${courseData?.price}
                </span>
              </div>

              <div className='bg-amber-50 p-5 rounded-xl shadow-sm flex justify-between items-center border border-amber-100'>
                <h3 className='text-xl font-medium text-gray-700'>Rating</h3>
                <span className='text-xl font-bold text-amber-600'>
                  {courseData?.rating || 0} ⭐
                </span>
              </div>

              <div className='bg-green-50 p-5 rounded-xl shadow-sm flex justify-between items-center border border-green-100'>
                <h3 className='text-xl font-medium text-gray-700'>
                  Total Enrollments
                </h3>
                <span className='text-xl font-bold text-green-600'>
                  {courseData?.totalEnrollments || 0}
                </span>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='bg-indigo-50 p-5 rounded-xl shadow-sm flex justify-between items-center border border-indigo-100'>
                <h3 className='text-xl font-medium text-gray-700'>
                  Total Likes
                </h3>
                <span className='text-xl font-bold text-indigo-600'>
                  {courseData?.totalLikes || 0}
                </span>
              </div>

              <div className='bg-red-50 p-5 rounded-xl shadow-sm flex justify-between items-center border border-red-100'>
                <h3 className='text-xl font-medium text-gray-700'>
                  Total Dislikes
                </h3>
                <span className='text-xl font-bold text-red-600'>
                  {courseData?.totalDisLikes || 0}
                </span>
              </div>

              <div className='bg-purple-50 p-5 rounded-xl shadow-sm flex justify-between items-center border border-purple-100'>
                <h3 className='text-xl font-medium text-gray-700'>
                  Total Revenue
                </h3>
                <span className='text-xl font-bold text-purple-600'>
                  $
                  {parseFloat(courseData?.price || 0) *
                    parseInt(courseData?.totalEnrollments || 0)}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
