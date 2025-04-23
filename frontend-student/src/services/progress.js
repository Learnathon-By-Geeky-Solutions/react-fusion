import { BACKEND } from '../constants';

export async function updateCourseProgress(payload) {
  console.log('Payload video', payload);
  try {
    const result = await fetch(`${BACKEND}/progress/module`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching module data:', error);
    return { success: false };
  }
}

export async function updateMilestoneProgress(payload) {
  try {
    const result = await fetch(`${BACKEND}/progress/milestone`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching milestone data:', error);
    return { success: false };
  }
}

export async function updateModuleProgress(payload) {
  try {
    const result = await fetch(`${BACKEND}/progress/module`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching module data:', error);
    return { success: false };
  }
}

export async function updateQuizProgress(payload) {
  console.log('Updating quiz progress with payload:', payload);
  try {
    const result = await fetch(`${BACKEND}/progress/quiz`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    console.log('Quiz progress', data);
    return data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return { success: false };
  }
}

export async function updateVideoProgress(payload) {
  console.log('Updating video progress with payload:', payload);
  try {
    const result = await fetch(`${BACKEND}/progress/video`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    console.log('video progress', data);
    return data;
  } catch (error) {
    console.error('Error fetching video data:', error);
    return { success: false };
  }
}
