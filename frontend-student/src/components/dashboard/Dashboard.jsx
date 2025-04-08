import React, { useEffect, useState } from 'react';
import useApi from '@/src/hooks/useApi';
import { getDashboard, getSingleCourse } from '@/src/services/dashboard';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const { fetchData } = useApi();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetchData(getDashboard, {});
        if (response.success) {
          const enrolledCourses = response?.data?.enrolledCourses || [];
          const courseIds = enrolledCourses.map((course) => course.courseId);

          courseIds.forEach(async (courseId) => {
            try {
              const singleCourseRes = await fetchData(
                getSingleCourse,
                courseId
              );
            } catch (err) {
              console.error(
                `Failed to fetch single course for ID ${courseId}:`,
                err
              );
            }
          });

          setCourses(response.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  return <div className='dashboard'></div>;
}
