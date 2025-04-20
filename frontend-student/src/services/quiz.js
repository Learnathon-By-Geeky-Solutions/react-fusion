import { BACKEND } from '../constants';

export async function checkQuiz(params) {
  console.log('Checking quiz with payload:', params);
  try {
    const result = await fetch(`${BACKEND}/quiz/check/${params.data.quizId}`, {
      method: 'POST',
      headers: {
        Authorization: params.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data.quizData)
    });

    const data = await result.json();
    console.log('Check quiz result:', data);
    return data;
  } catch (error) {
    console.error('Error checking quiz:', error);
    return { success: false };
  }
}

export async function getQuiz(params) {
  try {
    const result = await fetch(`${BACKEND}/quiz/${params.data.quizId}`, {
      method: 'GET',
      headers: {
        Authorization: params.user.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return { success: false };
  }
}
