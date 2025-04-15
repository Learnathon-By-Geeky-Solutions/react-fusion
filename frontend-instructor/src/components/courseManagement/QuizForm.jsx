// src/components/CourseManagement/QuizForm.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import useApi from '@/src/hooks/useApi';
import { addQuiz, updateQuiz } from '@/src/services/quiz';

const QuizForm = ({
  moduleId,
  videoId = null,
  initialValues = null,
  onSuccess,
  isEdit = false
}) => {
  const { fetchData } = useApi();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        answer: '',
        points: 10
      }
    ]
  };

  const validationSchema = Yup.object({
    questions: Yup.array()
      .of(
        Yup.object({
          question: Yup.string().required('Question is required'),
          options: Yup.array()
            .of(Yup.string().required('Option is required'))
            .min(2, 'At least 2 options required'),
          answer: Yup.string().required('Answer is required'),
          points: Yup.number()
            .required('Points are required')
            .min(1, 'Minimum 1 point')
        })
      )
      .min(1, 'At least one question is required')
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
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
            ...values
          }
        };
      }

      const result = await fetchData(isEdit ? updateQuiz : addQuiz, params);

      if (result.success) {
        if (onSuccess) onSuccess(result);
      } else {
        alert('Error: ' + (result.message || 'Could not save quiz'));
      }
    } catch (error) {
      console.error('Error submitting quiz form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>
        {isEdit ? 'Edit Quiz' : 'Create Quiz'}
      </h2>
      <Formik
        initialValues={initialValues || defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className='space-y-6'>
            <FieldArray name='questions'>
              {({ remove, push }) => (
                <div>
                  {values.questions.map((_, index) => (
                    <div
                      key={index}
                      className='border rounded-md p-4 mb-6 bg-gray-50'
                    >
                      <div className='flex justify-between items-center mb-4'>
                        <h3 className='text-lg font-medium'>
                          Question {index + 1}
                        </h3>
                        {values.questions.length > 1 && (
                          <button
                            type='button'
                            onClick={() => remove(index)}
                            className='text-red-500 hover:text-red-700'
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className='mb-4'>
                        <label
                          htmlFor={`questions.${index}.question`}
                          className='block text-sm font-medium text-gray-700 mb-1'
                        >
                          Question
                        </label>
                        <Field
                          type='text'
                          name={`questions.${index}.question`}
                          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                          placeholder='Enter your question'
                        />
                        <ErrorMessage
                          name={`questions.${index}.question`}
                          component='div'
                          className='mt-1 text-red-600 text-sm'
                        />
                      </div>

                      <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                          Options
                        </label>
                        <FieldArray name={`questions.${index}.options`}>
                          {({ remove: removeOption, push: pushOption }) => (
                            <div>
                              {values.questions[index].options.map(
                                (_, optionIndex) => (
                                  <div
                                    key={optionIndex}
                                    className='flex items-center mb-2'
                                  >
                                    <Field
                                      type='text'
                                      name={`questions.${index}.options.${optionIndex}`}
                                      className='flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                                      placeholder={`Option ${optionIndex + 1}`}
                                    />
                                    {values.questions[index].options.length >
                                      2 && (
                                      <button
                                        type='button'
                                        onClick={() =>
                                          removeOption(optionIndex)
                                        }
                                        className='ml-2 text-red-500 hover:text-red-700'
                                      >
                                        ✕
                                      </button>
                                    )}
                                  </div>
                                )
                              )}
                              <button
                                type='button'
                                onClick={() => pushOption('')}
                                className='mt-2 text-sm text-indigo-600 hover:text-indigo-800'
                              >
                                + Add Option
                              </button>
                            </div>
                          )}
                        </FieldArray>
                        <ErrorMessage
                          name={`questions.${index}.options`}
                          component='div'
                          className='mt-1 text-red-600 text-sm'
                        />
                      </div>

                      <div className='mb-4'>
                        <label
                          htmlFor={`questions.${index}.answer`}
                          className='block text-sm font-medium text-gray-700 mb-1'
                        >
                          Correct Answer
                        </label>
                        <Field
                          as='select'
                          name={`questions.${index}.answer`}
                          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                        >
                          <option value=''>Select correct answer</option>
                          {values.questions[index].options.map(
                            (option, optionIndex) =>
                              option && (
                                <option key={optionIndex} value={option}>
                                  {option}
                                </option>
                              )
                          )}
                        </Field>
                        <ErrorMessage
                          name={`questions.${index}.answer`}
                          component='div'
                          className='mt-1 text-red-600 text-sm'
                        />
                      </div>

                      <div>
                        <label
                          htmlFor={`questions.${index}.points`}
                          className='block text-sm font-medium text-gray-700 mb-1'
                        >
                          Points
                        </label>
                        <Field
                          type='number'
                          name={`questions.${index}.points`}
                          className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                          placeholder='Points for this question'
                        />
                        <ErrorMessage
                          name={`questions.${index}.points`}
                          component='div'
                          className='mt-1 text-red-600 text-sm'
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() =>
                      push({
                        question: '',
                        options: ['', '', '', ''],
                        answer: '',
                        points: 10
                      })
                    }
                    className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2'
                  >
                    + Add Question
                  </button>
                </div>
              )}
            </FieldArray>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300'
              >
                {isSubmitting
                  ? 'Saving...'
                  : isEdit
                  ? 'Update Quiz'
                  : 'Create Quiz'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuizForm;
