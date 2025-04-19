import React, { useState, useEffect } from 'react';
import { getQuiz } from '@/src/services/quiz';
import useApi from '@/src/hooks/useApi';

export default function QuizSection(quizId) {
  const { fetchData } = useApi();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuizData() {
      try {
        setLoading(true);
        const response = await fetchData(getQuiz, { quizId: quizId.quiz });
        console.log('QuizSection response', response);

        if (response.success) {
          setQuiz(response.data);
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
        <div className='space-y-6'>
          {quiz.questions?.map((questionItem, index) => (
            <div key={questionItem.id} className='bg-gray-50 rounded-lg p-4'>
              <h4 className='font-semibold text-lg mb-2'>
                {index + 1}. {questionItem.question}
              </h4>
              {questionItem.points && (
                <div className='mb-3 text-sm text-gray-500'>
                  Points: {questionItem.points}
                </div>
              )}

              <div className='space-y-2 ml-4'>
                {questionItem.options?.map((optionText, optIndex) => (
                  <div
                    key={`option-${questionItem.id}-${optIndex}`}
                    className='flex items-center p-3 bg-white border border-gray-200 rounded-md hover:border-blue-300 transition'
                  >
                    <div className='w-6 h-6 flex items-center justify-center mr-3 border-2 border-gray-300 rounded-full'>
                      {/* We don't have isCorrect info in the current response */}
                    </div>
                    <span>{optionText}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
