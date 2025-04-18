import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import useApi from '@/src/hooks/useApi';
import { addQuiz, updateQuiz } from '@/src/services/quiz';

const QuizForm = ({
  moduleId,
  onSuccess,
  quizData = null,
  isEditing = false,
  quizId = null
}) => {
  const { fetchData } = useApi();
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const initialValues = {
    questions:
      quizData && quizData.questions
        ? quizData.questions.map((q) => ({
            question: q.question || '',
            options: q.options || ['', '', '', ''],
            answer: q.answer || '',
            points: q.points || 5
          }))
        : []
  };

  const questionSchema = Yup.object({
    question: Yup.string().required('Question is required'),
    options: Yup.array()
      .of(Yup.string().required('Option is required'))
      .test(
        'has-four-options',
        'Exactly 4 non-empty options are required',
        (options) =>
          options && options.filter((o) => o.trim() !== '').length === 4
      )
      .test('unique-options', 'Options must be unique', (options) => {
        if (!options) return false;
        const nonEmptyOptions = options.filter((o) => o.trim() !== '');
        return new Set(nonEmptyOptions).size === nonEmptyOptions.length;
      }),
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
    console.log('Submitting quiz form:', values);
    setError('');

    try {
      const params = {
        questions: values.questions.map((q) => ({
          ...q,
          points: parseInt(q.points, 10)
        }))
      };

      let result;

      if (isEditing) {
        console.log('Updating quiz with ID:', quizId);
        result = await fetchData(updateQuiz, {
          quizId: quizId,
          quizData: params
        });
      } else {
        result = await fetchData(addQuiz, {
          moduleId,
          ...params
        });
      }

      if (result.success) {
        if (!isEditing) resetForm();
        if (onSuccess) onSuccess(result);
      } else {
        setError('Error: ' + (result.message || 'Could not save quiz'));
      }
    } catch (error) {
      console.error('Error submitting quiz form:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddQuestion = (questionData) => {
    if (!questionData.question) {
      alert('Question text is required');
      return null;
    }

    const filteredOptions = questionData.options.filter(
      (opt) => opt.trim() !== ''
    );
    if (filteredOptions.length !== 4) {
      alert('Exactly 4 non-empty options are required');
      return null;
    }

    if (new Set(filteredOptions).size !== filteredOptions.length) {
      alert('All options must be unique');
      return null;
    }

    return {
      question: questionData.question,
      options: filteredOptions,
      answer: questionData.answer,
      points: parseInt(questionData.points, 10) || 5
    };
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>
        {isEditing ? 'Edit Quiz' : 'Add New Quiz'}
      </h2>

      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
          {error}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnChange={false}
        validateOnBlur={true}
      >
        {({ values, isSubmitting, errors, touched, setFieldValue }) => (
          <Form className='space-y-6'>
            {/* Debug information - remove in production */}
            {Object.keys(errors).length > 0 && (
              <div className='bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4'>
                <p className='font-bold'>Validation Errors:</p>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </div>
            )}

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
                                value={newOptions[index]}
                                onChange={(e) =>
                                  handleOptionChange(index, e.target.value)
                                }
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
                            {newOptions.map((option, index) =>
                              option ? (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ) : null
                            )}
                          </select>
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Points
                          </label>
                          <input
                            type='number'
                            id='question-points'
                            min='1'
                            defaultValue='5'
                            className='w-full px-4 py-2 border border-gray-300 rounded-md'
                            placeholder='Points for this question'
                          />
                        </div>

                        <div className='flex justify-end space-x-2'>
                          <button
                            type='button'
                            className='px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
                            onClick={() => {
                              setShowQuestionForm(false);
                              setNewOptions(['', '', '', '']);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type='button'
                            className='px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            onClick={() => {
                              const questionElement =
                                document.getElementById('new-question');
                              const pointsElement =
                                document.getElementById('question-points');
                              const answerElement =
                                document.getElementById('correct-answer');

                              const newQuestion = {
                                question: questionElement.value,
                                options: newOptions,
                                answer: answerElement.value,
                                points: parseInt(pointsElement.value, 10) || 5
                              };

                              const validatedQuestion =
                                handleAddQuestion(newQuestion);
                              if (validatedQuestion) {
                                push(validatedQuestion);
                                setShowQuestionForm(false);
                                setNewOptions(['', '', '', '']);
                              }
                            }}
                          >
                            Add Question
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='my-4'>
                      <button
                        type='button'
                        className='px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                        onClick={() => setShowQuestionForm(true)}
                      >
                        Add New Question
                      </button>
                    </div>
                  )}

                  {values.questions.length > 0 && (
                    <div className='flex justify-end pt-4'>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className='px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300'
                      >
                        {isSubmitting
                          ? 'Saving...'
                          : isEditing
                          ? 'Update Quiz'
                          : 'Save Quiz'}
                      </button>
                    </div>
                  )}

                  {/* Show form-level validation errors */}
                  {typeof errors.questions === 'string' && (
                    <div className='mt-4 text-red-600 text-sm'>
                      {errors.questions}
                    </div>
                  )}
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default QuizForm;
