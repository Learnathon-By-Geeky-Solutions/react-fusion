import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useApi from '@/src/hooks/useApi';
import { addVideo, updateVideo } from '@/src/services/video';

const VideoForm = ({
  moduleId,
  onSuccess,
  videoData = null,
  isEditing = false,
  videoId = null
}) => {
  const { fetchData } = useApi();

  const initialValues = {
    title: videoData?.title || '',
    url: videoData?.url || '',
    length: videoData?.length || ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    url: Yup.string().required('URL is required'),
    length: Yup.number()
      .required('Video length is required')
      .positive('Length must be a positive number')
      .integer('Length must be a whole number')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const videoParams = {
        title: values.title,
        url: values.url,
        length: parseInt(values.length, 10)
      };

      let result;

      if (isEditing) {
        result = await fetchData(updateVideo, {
          videoId: videoId,
          videoData: videoParams
        });
      } else {
        result = await fetchData(addVideo, {
          moduleId,
          video: videoParams
        });
      }

      if (result.success) {
        if (!isEditing) resetForm();
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
        {isEditing ? 'Edit Video' : 'Add New Video'}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
                min='1'
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
                  : isEditing
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
