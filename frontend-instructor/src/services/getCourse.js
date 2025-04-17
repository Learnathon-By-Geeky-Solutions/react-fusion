import { BACKEND } from '../constants';

async function getAllCourses(params) {
  console.log('Fetching courses...', params);
  const items = {
    items: {
      instructors: true,
      milestones: true,
      modules: true,
      quizes: true,
      videos: true
    }
  };

  const result = await fetch(`${BACKEND}/course/get-courses`, {
    method: 'POST',
    headers: {
      Authorization: params.instructor.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items)
  });
  const data = await result.json();
  console.log('Fetched courses:', data);
  return data;
}

async function getCourseById(params) {
  const result = await fetch(`${BACKEND}/course/${params.data.courseId}`, {
    headers: {
      Authorization: params.instructor.token
    }
  });
  const resJson = await result.json();
  return resJson;
}
export { getCourseById };

export default getAllCourses;
