import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import useApi from '@/src/hooks/useApi';
import { addQuiz } from '@/src/services/quiz';

const QuizForm = ({ moduleId, onSuccess }) => {
  const { fetchData } = useApi();
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const initialValues = {
    questions: []
  };

  const questionSchema = Yup.object({
    question: Yup.string().required('Question is required'),
    options: Yup.array()
      .of(Yup.string().required('Option is required'))
      .length(4, 'Exactly 4 options are required')
      .test(
        'unique-options',
        'Options must be unique',
        (options) => options && new Set(options).size === options.length
      ),
    answer: Yup.string()
      .required('Answer is required')
      .test(
        'valid-answer',
        'Answer must be one of the options',
        (answer, context) => {
          const { options } = context.parent;
          return options && options.includes(answer);
        }
      ),
    points: Yup.number()
      .required('Points are required')
      .positive('Points must be a positive number')
      .integer('Points must be a whole number')
  });

  const validationSchema = Yup.object({
    questions: Yup.array()
      .of(questionSchema)
      .min(1, 'At least one question is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const params = {
        moduleId,
        questions: values.questions.map((q) => ({
          ...q,
          points: parseInt(q.points, 10)
        }))
      };

      const result = await fetchData(addQuiz, params);

      if (result.success) {
        resetForm();
        if (onSuccess) onSuccess(result);
      } else {
        alert('Error: ' + (result.message || 'Could not save quiz'));
      }
    } catch (error) {
      console.error('Error submitting quiz form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddQuestion = (question) => {
    // Ensure question has exactly 4 options
    const newQuestion = {
      ...question,
      options:
        question.options.length === 4
          ? question.options
          : [
              question.options[0] || '',
              question.options[1] || '',
              question.options[2] || '',
              question.options[3] || ''
            ]
    };

    return newQuestion;
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>Add New Quiz</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, errors, touched, setFieldValue }) => (
          <Form className='space-y-6'>
            <FieldArray name='questions'>
              {({ remove, push }) => (
                <div>
                  {values.questions.length > 0 && (
                    <div className='mb-4'>
                      <h3 className='text-lg font-medium mb-3'>Questions</h3>
                      {values.questions.map((question, index) => (
                        <div
                          key={index}
                          className='border border-gray-300 rounded-md p-4 mb-4'
                        >
                          {editingIndex === index ? (
                            <>
                              <div className='flex justify-between items-center mb-3'>
                                <h4 className='font-medium'>
                                  Question {index + 1}
                                </h4>
                                <button
                                  type='button'
                                  className='text-red-600 hover:text-red-800'
                                  onClick={() => {
                                    remove(index);
                                    setEditingIndex(-1);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>

                              <div className='mb-3'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                  Question
                                </label>
                                <Field
                                  name={`questions.${index}.question`}
                                  type='text'
                                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                                />
                                <ErrorMessage
                                  name={`questions.${index}.question`}
                                  component='div'
                                  className='mt-1 text-red-600 text-sm'
                                />
                              </div>

                              <div className='mb-3'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                  Options (All 4 options are required)
                                </label>
                                <div>
                                  {[0, 1, 2, 3].map((optIndex) => (
                                    <div
                                      key={optIndex}
                                      className='flex items-center mb-2'
                                    >
                                      <Field
                                        name={`questions.${index}.options.${optIndex}`}
                                        type='text'
                                        className='flex-1 px-4 py-2 border border-gray-300 rounded-md'
                                        placeholder={`Option ${optIndex + 1}`}
                                      />
                                    </div>
                                  ))}
                                </div>
                                <ErrorMessage
                                  name={`questions.${index}.options`}
                                  component='div'
                                  className='mt-1 text-red-600 text-sm'
                                />
                              </div>

                              <div className='mb-3'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                  Correct Answer
                                </label>
                                <Field
                                  as='select'
                                  name={`questions.${index}.answer`}
                                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                                >
                                  <option value=''>
                                    Select correct answer
                                  </option>
                                  {question.options &&
                                    question.options.map(
                                      (option, optIndex) =>
                                        option && (
                                          <option key={optIndex} value={option}>
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

                              <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                  Points
                                </label>
                                <Field
                                  name={`questions.${index}.points`}
                                  type='number'
                                  min='1'
                                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                                  placeholder='Points for this question'
                                />
                                <ErrorMessage
                                  name={`questions.${index}.points`}
                                  component='div'
                                  className='mt-1 text-red-600 text-sm'
                                />
                              </div>

                              <div className='flex justify-end'>
                                <button
                                  type='button'
                                  className='px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                  onClick={() => setEditingIndex(-1)}
                                >
                                  Done
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className='flex justify-between items-center'>
                              <div className='flex-1'>
                                <h4 className='font-medium'>
                                  Question {index + 1}: {question.question}
                                </h4>
                              </div>
                              <div className='flex space-x-2'>
                                <button
                                  type='button'
                                  className='text-blue-600 hover:text-blue-800'
                                  onClick={() => setEditingIndex(index)}
                                >
                                  Edit
                                </button>
                                <button
                                  type='button'
                                  className='text-red-600 hover:text-red-800'
                                  onClick={() => remove(index)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {showQuestionForm ? (
                    <div className='border border-gray-300 rounded-md p-4 mb-4'>
                      <h3 className='text-lg font-medium mb-3'>
                        Add New Question
                      </h3>
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Question
                          </label>
                          <input
                            type='text'
                            id='new-question'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md'
                            placeholder='Enter your question'
                          />
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Options (All 4 options are required)
                          </label>
                          {[0, 1, 2, 3].map((index) => (
                            <div key={index} className='flex items-center mb-2'>
                              <input
                                type='text'
                                id={`option-${index}`}
                                className='flex-1 px-4 py-2 border border-gray-300 rounded-md'
                                placeholder={`Option ${index + 1}`}
                              />
                            </div>
                          ))}
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Correct Answer
                          </label>
                          <select
                            id='correct-answer'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md'
                          >
                            <option value=''>Select correct answer</option>
                            <option value='option-0'>
                              Option from field 1
                            </option>
                            <option value='option-1'>
                              Option from field 2
                            </option>
                            <option value='option-2'>
                              Option from field 3
                            </option>
                            <option value='option-3'>
                              Option from field 4
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Points
                          </label>
                          <input
                            type='number'
                            id='points'
                            min='1'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md'
                            placeholder='Points for this question'
                            defaultValue='5'
                          />
                        </div>

                        <div className='flex justify-end space-x-3'>
                          <button
                            type='button'
                            className='px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                            onClick={() => setShowQuestionForm(false)}
                          >
                            Cancel
                          </button>
                          <button
                            type='button'
                            className='px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            onClick={() => {
                              const questionEl =
                                document.getElementById('new-question');
                              const option0El =
                                document.getElementById('option-0');
                              const option1El =
                                document.getElementById('option-1');
                              const option2El =
                                document.getElementById('option-2');
                              const option3El =
                                document.getElementById('option-3');
                              const answerEl =
                                document.getElementById('correct-answer');
                              const pointsEl =
                                document.getElementById('points');

                              const options = [
                                option0El.value,
                                option1El.value,
                                option2El.value,
                                option3El.value
                              ];

                              // Get the actual answer value based on selection
                              let answerValue = '';
                              if (answerEl.value === 'option-0')
                                answerValue = option0El.value;
                              if (answerEl.value === 'option-1')
                                answerValue = option1El.value;
                              if (answerEl.value === 'option-2')
                                answerValue = option2El.value;
                              if (answerEl.value === 'option-3')
                                answerValue = option3El.value;

                              push({
                                question: questionEl.value,
                                options: options,
                                answer: answerValue,
                                points: pointsEl.value
                              });
                              setShowQuestionForm(false);

                              // Clear the form fields
                              questionEl.value = '';
                              option0El.value = '';
                              option1El.value = '';
                              option2El.value = '';
                              option3El.value = '';
                              answerEl.value = '';
                              pointsEl.value = '5';
                            }}
                          >
                            Add Question
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type='button'
                      className='px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      onClick={() => setShowQuestionForm(true)}
                    >
                      Add Question
                    </button>
                  )}

                  {errors.questions && touched.questions && (
                    <div className='mt-2 text-red-600 text-sm'>
                      {errors.questions}
                    </div>
                  )}
                </div>
              )}
            </FieldArray>

            {values.questions.length > 0 && (
              <div className='flex justify-end'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300'
                >
                  {isSubmitting ? 'Saving...' : 'Add Quiz'}
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuizForm;
