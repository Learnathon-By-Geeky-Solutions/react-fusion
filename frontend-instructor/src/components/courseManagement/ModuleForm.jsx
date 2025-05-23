import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useApi from '@/src/hooks/useApi';
import { addModule, updateModule } from '@/src/services/module';

const ModuleForm = ({
  milestoneId,
  moduleId = null,
  initialValues = null,
  onSuccess,
  isEdit = false
}) => {
  const { fetchData } = useApi();
  const defaultValues = {
    title: '',
    description: ''
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const params = isEdit
        ? {
            moduleId,
            module: {
              title: values.title,
              description: values.description
            }
          }
        : {
            milestoneId,
            module: {
              title: values.title,
              description: values.description
            }
          };

      const result = await fetchData(isEdit ? updateModule : addModule, params);

      if (result.success) {
        if (onSuccess) onSuccess(result);
      } else {
        alert('Error: ' + (result.message || 'Could not save module'));
      }
    } catch (error) {
      console.error('Error submitting module form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getSubmitButtonText = (isSubmitting, isEdit) => {
    if (isSubmitting) return 'Saving...';
    if (isEdit) return 'Update Module';
    return 'Add Module';
  };

  return (
    <Formik
      initialValues={initialValues || defaultValues}
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
              Module Title
            </label>
            <Field
              type='text'
              name='title'
              id='title'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
              placeholder='Enter module title'
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
              placeholder='Enter module description'
            />
            <ErrorMessage
              name='description'
              component='div'
              className='mt-1 text-red-600 text-sm'
            />
          </div>

          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={() => onSuccess()}
              className='px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300'
            >
              {getSubmitButtonText(isSubmitting, isEdit)}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

ModuleForm.propTypes = {
  milestoneId: PropTypes.string.isRequired,
  moduleId: PropTypes.string,
  initialValues: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  isEdit: PropTypes.bool
};

export default ModuleForm;
