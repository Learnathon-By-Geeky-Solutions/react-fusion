import useApi from '@/src/hooks/useApi';
import { getCourseById } from '@/src/services/course';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CourseDetails() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { fetchData } = useApi();
  useEffect(() => {
    const fetchCourseDetails = async () => {
      const data = await fetchData(getCourseById, { courseId });
      if (data.success) {
        setCourseData(data.data);
      }
    };
    fetchCourseDetails();
  }, []);
  return <div>Course Details</div>;
}
