import React, { useState, useEffect } from 'react';
import { getQuiz, checkQuiz } from '@/src/services/quiz';
import { updateQuizProgress } from '@/src/services/progress';
import useApi from '@/src/hooks/useApi';

export default function QuizSection(quizId) {
  const { fetchData } = useApi();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [previousBestScore, setPreviousBestScore] = useState(null);

  useEffect(() => {
    async function fetchQuizData() {
      try {
        setLoading(true);
        const response = await fetchData(getQuiz, { quizId: quizId.quiz });

        if (response.success) {
          setQuiz(response.data);
          if (
            response.data.progress !== undefined &&
            response.data.progress !== null
          ) {
            setPreviousBestScore(response.data.progress.QuizProgress.score);
          }

          const initialAnswers = {};
          response.data.questions?.forEach((question) => {
            initialAnswers[question.id] = '';
          });
          setSelectedAnswers(initialAnswers);
        } else {
          console.error('Failed to fetch quiz data:', response.message);
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    }

    if (quizId) {
      fetchQuizData();
    }
  }, [quizId]);

  const handleOptionSelect = (questionId, optionText) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionText
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      setSubmitting(true);

      const answers = Object.keys(selectedAnswers).map((questionId) => ({
        id: questionId,
        answer: selectedAnswers[questionId]
      }));

      const response = await fetchData(checkQuiz, {
        quizId: quizId.quiz,
        quizData: {
          answers: answers
        }
      });

      setQuizResults(response.data);

      if (response.success && response.data) {
        try {
          await fetchData(updateQuizProgress, {
            quizId: quizId.quiz,
            isCompleted: true,
            score: response.data.marks
          });
        } catch (error) {
          console.error('Error updating quiz progress:', error);
        }
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const isCorrectAnswer = (questionId, optionText) => {
    if (!quizResults) return false;

    const correctQuestion = quizResults.quiz.questions.find(
      (q) => q.id === questionId
    );
    return correctQuestion && correctQuestion.answer === optionText;
  };

  if (loading) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <p className='text-gray-500'>Loading quiz...</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className='bg-white rounded-lg shadow-md p-6'>
        <p className='text-gray-500'>No quiz data available.</p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
      <div className='p-6'>
        {/* Quiz title section with previous best score */}
        {previousBestScore !== null && (
          <div className='mb-4 pb-3 border-b border-gray-200'>
            <div className='text-sm font-medium text-blue-600'>
              Previous Best: {previousBestScore} points
            </div>
          </div>
        )}

        <div className='space-y-6'>
          {quiz.questions?.map((questionItem, index) => (
            <div key={questionItem.id} className='bg-gray-50 rounded-lg p-4'>
              <h4 className='text-left font-semibold text-lg mb-2'>
                {index + 1}. {questionItem.question}
              </h4>
              {questionItem.points && (
                <div className='text-left mb-3 text-sm text-gray-500'>
                  Points: {questionItem.points}
                </div>
              )}

              <div className='space-y-2 ml-4'>
                {questionItem.options?.map((optionText, optIndex) => {
                  const isCorrect = isCorrectAnswer(
                    questionItem.id,
                    optionText
                  );
                  const optionId = `option-${questionItem.id}-${optIndex}`;

                  return (
                    <label
                      key={optionId}
                      className={`flex items-center p-3 border border-gray-200 rounded-md hover:border-blue-300 transition ${
                        quizResults && isCorrect ? 'bg-green-100' : 'bg-white'
                      }`}
                    >
                      <input
                        type='radio'
                        id={optionId}
                        name={`question-${questionItem.id}`}
                        value={optionText}
                        checked={
                          selectedAnswers[questionItem.id] === optionText
                        }
                        onChange={() =>
                          !quizResults &&
                          handleOptionSelect(questionItem.id, optionText)
                        }
                        disabled={!!quizResults}
                        className='w-6 h-6 mr-3'
                      />
                      <span>{optionText}</span>
                      {quizResults && isCorrect && (
                        <span className='ml-auto text-green-600 font-medium'>
                          ✓ Correct
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {!quizResults && (
            <div className='mt-6 flex justify-end'>
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-blue-300'
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            </div>
          )}
          {quizResults && (
            <div className='mt-6 p-4 bg-blue-50 rounded-md'>
              <div className='font-semibold text-lg'>
                Total Score: {quizResults.marks} points
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
