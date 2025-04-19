import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useApi from '@/src/hooks/useApi';
import { useParams } from 'react-router-dom';
import { addCourse, updateCourse } from '@/src/services/course';

const CourseForm = ({ initialValues = null, onSuccess, isEdit = false }) => {
  const { fetchData } = useApi();
  const { courseId } = useParams();
  const defaultValues = {
    title: '',
    description: '',
    price: 0,
    thumbnail: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price cannot be negative'),
    thumbnail: Yup.string()
      .required('Thumbnail URL is required')
      .url('Must be a valid URL')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = isEdit
        ? { courseData: values, courseId: courseId }
        : values;
      const result = await fetchData(
        isEdit ? updateCourse : addCourse,
        payload
      );

      if (result.success) {
        if (isEdit) {
          alert('Course updated successfully');
        } else {
          resetForm();
          if (onSuccess) onSuccess(result);
        }
      } else {
        alert('Error: ' + (result.message || 'Could not save course'));
      }
    } catch (error) {
      console.error('Error submitting course form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-6'>
        {isEdit ? 'Edit Course' : 'Create New Course'}
      </h2>
      <Formik
        initialValues={initialValues || defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className='space-y-6'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Course Title
              </label>
              <Field
                type='text'
                name='title'
                id='title'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter course title'
              />
              <ErrorMessage
                name='title'
                component='div'
                className='mt-1 text-red-600 text-sm'
              />
            </div>

            <div>
              <label
                htmlFor='description'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Description
              </label>
              <Field
                as='textarea'
                name='description'
                id='description'
                rows='4'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter course description'
              />
              <ErrorMessage
                name='description'
                component='div'
                className='mt-1 text-red-600 text-sm'
              />
            </div>

            <div>
              <label
                htmlFor='price'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Price (USD)
              </label>
              <Field
                type='number'
                name='price'
                id='price'
                step='0.01'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter course price'
              />
              <ErrorMessage
                name='price'
                component='div'
                className='mt-1 text-red-600 text-sm'
              />
            </div>

            <div>
              <label
                htmlFor='thumbnail'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Thumbnail URL
              </label>
              <Field
                type='text'
                name='thumbnail'
                id='thumbnail'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter thumbnail URL'
              />
              <ErrorMessage
                name='thumbnail'
                component='div'
                className='mt-1 text-red-600 text-sm'
              />
            </div>

            {values.thumbnail && (
              <div className='mt-2'>
                <p className='text-sm font-medium text-gray-700 mb-1'>
                  Preview:
                </p>
                <img
                  src={values.thumbnail}
                  alt='Thumbnail preview'
                  className='w-full max-w-120 max-h-120 object-cover rounded-md'
                />
              </div>
            )}

            <div className='flex justify-end'>
              {(() => {
                let buttonText = 'Create Course';
                if (isSubmitting) {
                  buttonText = 'Saving...';
                } else if (isEdit) {
                  buttonText = 'Update Course';
                }

                return (
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300'
                  >
                    {buttonText}
                  </button>
                );
              })()}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

CourseForm.propTypes = {
  initialValues: PropTypes.object,
  onSuccess: PropTypes.func,
  isEdit: PropTypes.bool
};

export default CourseForm;
