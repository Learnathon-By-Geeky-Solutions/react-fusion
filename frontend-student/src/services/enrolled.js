import { BACKEND } from '../constants';

export async function enrollCheck(payload) {
  try {
    const result = await fetch(`${BACKEND}/course/checkenroll/${payload.data.courseId}`, {
      method: 'GET',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      }
    });

    const data = await result.json();
    console.log('Response from enrollCheck:', data);
    return data;
  } catch (error) {
    console.error('Error fetching video:', error);
    return { success: false };
  }
}
