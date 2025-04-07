import useApi from '@/src/hooks/useApi';
import { analyticsService } from '@/src/services/analytics';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CourseAnalytics() {
  const { fetchData } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    const getAnalytics = async () => {
      const data = await fetchData(analyticsService.getAnalyticsByCourse, {
        courseId: courseId
      });
      setCourseData(data.data);
    };
    try {
      getAnalytics();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const { courseId } = useParams();
  return (
    <div className='px-4'>
      <div className='border-2 borgray-200 rounded-lg p-4 my-4 flex justify-between items-center'>
        <div>
          <h1 className='text-5xl font-bold'>{courseData.title}</h1>
          <p className='text-gray-500'>{courseData.description}</p>
        </div>
        <div className='w-1/5'>
          <img src='https://2ality.com/2011/10/logo-js/js.jpg' />
        </div>
      </div>
      <div className='border-2 borgray-200 rounded-lg p-4 my-4'>
        <div className='flex mt-4'>
          <div className='w-1/3 p-4 border-2 border-gray-300 rounded-xl flex justify-between items-center'>
            <h1 className='text-xl'>Price</h1>
            <h1 className='text-xl'>{courseData?.price}</h1>
          </div>
          <div className='w-1/3 p-4 border-2 border-gray-300 rounded-xl flex justify-between items-center mx-4'>
            <h1 className='text-xl'>Rating</h1>
            <h1 className='text-xl'>{courseData?.rating | 0} ⭐</h1>
          </div>
          <div className='w-1/3 p-4 border-2 border-gray-300 rounded-xl flex justify-between items-center'>
            <h1 className='text-xl'>Total Enrollments</h1>
            <h1 className='text-xl'>{courseData?.totalEnrollments}</h1>
          </div>
        </div>

        <div className='flex mt-4'>
          <div className='w-1/3 p-4 border-2 border-gray-300 rounded-xl flex justify-between items-center'>
            <h1 className='text-xl'>Total Likes</h1>
            <h1 className='text-xl'>{courseData?.totalLikes} </h1>
          </div>
          <div className='w-1/3 p-4 border-2 border-gray-300 rounded-xl flex justify-between items-center mx-4'>
            <h1 className='text-xl'>Total Dislikes</h1>
            <h1 className='text-xl'>{courseData?.totalDisLikes} </h1>
          </div>
          <div className='w-1/3 p-4 border-2 border-gray-300 rounded-xl flex justify-between items-center'>
            <h1 className='text-xl'>Total Revenue</h1>
            <h1 className='text-xl'>
              {parseFloat(courseData?.price) *
                parseInt(courseData?.totalEnrollments)}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
