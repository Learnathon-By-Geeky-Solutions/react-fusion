import { BACKEND } from '../constants';

export async function addCourse(courseData) {
  try {
    const result = await fetch(`${BACKEND}/course/create`, {
      method: 'POST',
      headers: {
        Authorization: courseData.instructor.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(courseData.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error adding course:', error);
    return { success: false };
  }
}
