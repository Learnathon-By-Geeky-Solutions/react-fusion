import { BACKEND } from '../constants';

export async function addQuiz(params) {
  try {
    const result = await fetch(`${BACKEND}/quiz/`, {
      method: 'POST',
      headers: {
        Authorization: params.instructor.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error adding quiz:', error);
    return { success: false };
  }
}

export async function checkQuiz(params) {
  try {
    const result = await fetch(`${BACKEND}/quiz/check/${params.data.quizId}`, {
      method: 'POST',
      headers: {
        Authorization: params.instructor.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error checking quiz:', error);
    return { success: false };
  }
}

export async function updateQuiz(params) {
  console.log('Update params', params);
  try {
    const result = await fetch(`${BACKEND}/quiz/${params.data.quizId}`, {
      method: 'PUT',
      headers: {
        Authorization: params.instructor.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data.quizData)
    });

    const data = await result.json();
    console.log('Update data', data);
    return data;
  } catch (error) {
    console.error('Error updating quiz:', error);
    return { success: false };
  }
}

export async function deleteQuiz(params) {
  console.log('Delete params', params);
  try {
    const result = await fetch(`${BACKEND}/quiz/${params.data.quizId}`, {
      method: 'DELETE',
      headers: {
        Authorization: params.instructor.token
      }
    });

    const data = await result.json();
    console.log('Delete data', data);
    return data;
  } catch (error) {
    console.error('Error delete quiz:', error);
    return { success: false };
  }
}

export async function getQuiz(params) {
  try {
    const result = await fetch(`${BACKEND}/quiz/${params.data.quizId}`, {
      method: 'GET',
      headers: {
        Authorization: params.instructor.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return { success: false };
  }
}
