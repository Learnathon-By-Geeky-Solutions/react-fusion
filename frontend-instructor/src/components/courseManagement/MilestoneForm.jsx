// src/components/CourseManagement/MilestoneForm.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useApi from '@/src/hooks/useApi';
import { addMilestone, updateMilestone } from '@/src/services/milestone';

const MilestoneForm = ({
  courseId,
  milestoneId = null,
  initialValues = null,
  onSuccess,
  isEdit = false
}) => {
  const { fetchData } = useApi();
  const defaultValues = {
    milestone: {
      title: '',
      description: ''
    },
    courseId: courseId
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const params = isEdit
        ? {
            milestoneId,
            milestone: {
              title: values.title,
              description: values.description
            }
          }
        : {
            milestone: {
              title: values.title,
              description: values.description
            },
            courseId
          };

      const result = await fetchData(
        isEdit ? updateMilestone : addMilestone,
        params
      );

      if (result.success) {
        if (!isEdit) resetForm();
        if (onSuccess) onSuccess(result);
      } else {
        alert('Error: ' + (result.message || 'Could not save milestone'));
      }
    } catch (error) {
      console.error('Error submitting milestone form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>
        {isEdit ? 'Edit Milestone' : 'Add New Milestone'}
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
                Milestone Title
              </label>
              <Field
                type='text'
                name='title'
                id='title'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter milestone title'
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
                rows='3'
                className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Enter milestone description'
              />
              <ErrorMessage
                name='description'
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
                  ? 'Update Milestone'
                  : 'Add Milestone'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MilestoneForm;
