import { BACKEND } from '../constants';

export async function buyCourse(payload) {
  console.log('Course data in buyCourse:', payload);
  try {
    const result = await fetch(`${BACKEND}/transaction/buy-course`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    console.log('Response from buyCourse:', data);
    return data;
  } catch (error) {
    console.error('Error buying course:', error);
    return { success: false };
  }
}
