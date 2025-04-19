import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllCourses,
  priceFilter,
  ratingFilter
} from '@/src/services/course';
import { noimage } from '../../assets';
import { motion } from 'framer-motion';
import FilterControls from './FilterControls';
import useApi from '@/src/hooks/useApi';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(null);
  const [filterDirection, setFilterDirection] = useState('asc');
  const { fetchData } = useApi();

  useEffect(() => {
    fetchCourses();
  }, [filterType, filterDirection]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      let data;
      if (!filterType) {
        data = await fetchData(getAllCourses, {});
      } else if (filterType === 'price') {
        data = await fetchData(priceFilter, { filter: filterDirection });
      } else if (filterType === 'rating') {
        data = await fetchData(ratingFilter, { filter: filterDirection });
      }
      setCourses(data.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilterType(null);
    setFilterDirection('asc');
  };

  const handleFilterToggle = (type) => {
    if (filterType === type) {
      setFilterDirection(filterDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setFilterType(type);
      setFilterDirection('asc');
    }
  };

  const getThumbnail = (thumbnail) => {
    return thumbnail === 'str' ? noimage : thumbnail;
  };

  // Function to truncate title if it's longer than 40 characters
  const truncateTitle = (title) => {
    return title.length > 40 ? title.substring(0, 40) + '...' : title;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const filteredCourses = courses.filter((course) => {
    return course.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderSkeleton = () => {
    return Array(6)
      .fill()
      .map((_, index) => (
        <div
          key={index}
          className='bg-white shadow-lg rounded-lg overflow-hidden animate-pulse'
        >
          <div className='w-full h-60 bg-gray-200'></div>
          <div className='p-4'>
            <div className='h-6 bg-gray-200 rounded w-3/4 mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-full mt-4'></div>
          </div>
          <div className='p-4 mt-auto'>
            <div className='flex justify-between items-center mb-4'>
              <div className='h-6 bg-gray-200 rounded w-20'></div>
              <div className='h-6 bg-gray-200 rounded w-24'></div>
            </div>
            <div className='h-10 bg-gray-200 rounded w-full'></div>
          </div>
        </div>
      ));
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          {renderSkeleton()}
        </div>
      );
    }

    if (error) {
      return (
        <div className='bg-red-50 border-l-4 border-red-500 p-4 rounded'>
          <div className='flex items-center'>
            <svg
              className='h-6 w-6 text-red-500 mr-3'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <p className='text-red-700'>{error}</p>
          </div>
        </div>
      );
    }

    if (filteredCourses.length === 0) {
      return (
        <div className='text-center py-10'>
          <svg
            className='mx-auto h-12 w-12 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <h3 className='mt-2 text-lg font-medium text-gray-900'>
            No courses found
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      );
    }

    return (
      <motion.div
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            className='bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full'
            variants={itemVariants}
          >
            <div className='relative w-full h-60 overflow-hidden group'>
              <img
                src={getThumbnail(course.thumbnail)}
                alt={course.title}
                className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500'
              />
            </div>
            <div className='p-6 flex-grow flex flex-col'>
              <h2 className='text-xl font-bold text-gray-900 mb-4'>
                {truncateTitle(course.title)}
              </h2>

              <div className='flex justify-between items-center mt-auto mb-4'>
                <p className='text-2xl font-bold text-gray-800'>
                  ${course.price}
                </p>
                <div className='flex items-center'>
                  <svg
                    className='w-5 h-5 text-yellow-400 mr-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                  <span className='font-medium text-2xl text-gray-800'>
                    {course.rating !== null ? course.rating : '0'}
                  </span>
                </div>
              </div>

              <Link to={`/courses/${course.id}`} className='mt-auto'>
                <button className='w-full px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center'>
                  View Details
                  <svg
                    className='ml-2 w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className='bg-gradient-to-b from-gray-50 to-white p-6 max-w-6xl mx-auto mt-20 mb-10'>
      <div className='mb-10'>
        <motion.h1
          className='text-4xl md:text-5xl font-bold mb-4 text-gray-900'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Courses
        </motion.h1>
        <motion.p
          className='text-xl text-gray-600 mb-4'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Explore our wide range of courses to boost your skills and career
        </motion.p>

        <motion.div
          className='flex flex-col md:flex-row gap-4 mb-4'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className='relative flex-grow'>
            <input
              type='text'
              placeholder='Search courses...'
              className='w-full py-3 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className='absolute right-3 top-3 w-6 h-6 text-gray-400'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
            </svg>
          </div>

          <FilterControls
            filterType={filterType}
            filterDirection={filterDirection}
            onFilterToggle={handleFilterToggle}
            onClearFilters={clearFilters}
          />
        </motion.div>
      </div>

      {renderContent()}
    </div>
  );
}
