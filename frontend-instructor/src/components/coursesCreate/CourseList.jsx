// src/pages/Courses/CourseList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '@/src/hooks/useApi';
import CourseListComponent from '@/src/components/courseManagement/CourseList';

const CourseList = () => {
  const { fetchData } = useApi();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // Assuming there's a getCourses service function
      const result = await fetchData(
        (params) =>
          fetch(`${process.env.BACKEND}/courses`, {
            headers: { Authorization: params.token }
          }).then((res) => res.json()),
        {}
      );

      if (result.success) {
        setCourses(result.courses || []);
      } else {
        setError('Could not fetch courses');
      }
    } catch (err) {
      setError('Error fetching courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [fetchData]);

  const handleDelete = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>My Courses</h1>
        <Link
          to='/courses/create'
          className='px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Create New Course
        </Link>
      </div>

      {loading ? (
        <div className='text-center py-10'>
          <p className='text-gray-500'>Loading courses...</p>
        </div>
      ) : error ? (
        <div className='text-center py-10 text-red-600'>
          <p>{error}</p>
          <button
            onClick={fetchCourses}
            className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
          >
            Try Again
          </button>
        </div>
      ) : (
        <CourseListComponent
          courses={courses}
          onDelete={handleDelete}
          onRefresh={fetchCourses}
        />
      )}
    </div>
  );
};

export default CourseList;
