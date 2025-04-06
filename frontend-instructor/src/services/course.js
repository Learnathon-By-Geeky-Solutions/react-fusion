import { BACKEND } from '../constants';

async function getAllCourses(token) {
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
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items)
  });
  const data = await result.json();
  console.log(data);
  return data;
}

export default getAllCourses;
