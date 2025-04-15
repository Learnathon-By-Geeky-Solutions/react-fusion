// src/components/CourseManagement/VideoForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useApi from '@/src/hooks/useApi';
import { addVideo, updateVideo } from '@/src/services/video';

const VideoForm = ({
  moduleId,
  videoId = null,
  initialValues = null,
  onSuccess,
  isEdit = false
}) => {
  const { fetchData } = useApi();
  const defaultValues = {
    title: '',
    url: '',
    length: 0
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    url: Yup.string().required('Video URL is required'),
    length: Yup.number()
      .required('Video length is required')
      .min(0, 'Length cannot be negative')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let params;

      if (isEdit) {
        params = {
          data: {
            videoId,
            ...values
          }
        };
      } else {
        params = {
          data: {
            moduleId,
            video: values
          }
        };
      }

      const result = await fetchData(isEdit ? updateVideo : addVideo, params);

      if (result.success) {
        if (!isEdit) resetForm();
        if (onSuccess) onSuccess(result);
      } else {
        alert('Error: ' + (result.message || 'Could not save video'));
      }
    } catch (error) {
      console.error('Error submitting video form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>
        {isEdit ? 'Edit Video' : 'Add New Video'}
      </h2>
      <Formik
        initialValues={initialValues || defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='space-y-4'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Video Title
              </label>
              <Field
                type='text'
                name='title'
                id='title'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter video title'
              />
              <ErrorMessage
                name='title'
                component='div'
                className='mt-1 text-red-600 text-sm'
              />
            </div>

            <div>
              <label
                htmlFor='url'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Video URL
              </label>
              <Field
                type='text'
                name='url'
                id='url'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter video URL'
              />
              <ErrorMessage
                name='url'
                component='div'
                className='mt-1 text-red-600 text-sm'
              />
            </div>

            <div>
              <label
                htmlFor='length'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Video Length (minutes)
              </label>
              <Field
                type='number'
                name='length'
                id='length'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter video length in minutes'
              />
              <ErrorMessage
                name='length'
                component='div'
                className='mt-1 text-red-600 text-sm'
              />
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300'
              >
                {isSubmitting
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Video'
                  : 'Add Video'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VideoForm;
