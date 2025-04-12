import { BACKEND } from '../constants';

export async function getDashboard(payload) {
  try {
    const result = await fetch(`${BACKEND}/analytics/student-all`, {
      method: 'GET',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return { success: false };
  }
}

export async function getSingleCourse(payload) {
  try {
    const result = await fetch(`${BACKEND}/analytics/student/${payload.data}`, {
      method: 'GET',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching single course:', error);
    return { success: false };
  }
}
