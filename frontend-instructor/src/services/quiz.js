import { BACKEND } from '../constants';

export async function addQuiz(params) {
  try {
    const result = await fetch(`${BACKEND}/quiz/`, {
      method: 'POST',
      headers: {
        Authorization: params.token,
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
    const result = await fetch(`${BACKEND}/quiz/check/${params.data.videoId}`, {
      method: 'POST',
      headers: {
        Authorization: params.token,
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
  try {
    const result = await fetch(`${BACKEND}/quiz/${params.data.videoId}`, {
      method: 'PUT',
      headers: {
        Authorization: params.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error updating quiz:', error);
    return { success: false };
  }
}

export async function deleteQuiz(params) {
  try {
    const result = await fetch(`${BACKEND}/quiz/${params.data.videoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: params.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error delete quiz:', error);
    return { success: false };
  }
}

export async function getVideo(params) {
  try {
    const result = await fetch(`${BACKEND}/quiz/${params.videoId}`, {
      method: 'GET',
      headers: {
        Authorization: params.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return { success: false };
  }
}
