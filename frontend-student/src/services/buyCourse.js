import { BACKEND } from '../constants';

export async function buyCourse(courseData) {
  try {
    const result = await fetch(`${BACKEND}/transaction/buy-course`, {
      method: 'POST',
      headers: {
        Authorization: courseData.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(courseData.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error buying course:', error);
    return { success: false };
  }
}
