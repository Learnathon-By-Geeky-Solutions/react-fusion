import { BACKEND } from '../constants';

export async function milestone(payload) {
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
    console.error('Error buying course:', error);
    return { success: false };
  }
}

export async function module(payload) {
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
    console.error('Error buying course:', error);
    return { success: false };
  }
}

export async function quiz(payload) {
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
    return data;
  } catch (error) {
    console.error('Error buying course:', error);
    return { success: false };
  }
}

export async function video(payload) {
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
    console.error('Error buying course:', error);
    return { success: false };
  }
}
