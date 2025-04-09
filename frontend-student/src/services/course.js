import { BACKEND } from '../constants';

async function getAllCourses(payload) {
  const items = {
    items: {
      instructors: true,
      milestones: true,
      modules: true,
      quizes: true,
      videos: true,
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
  return data;
}

async function getEnrolledCourses(payload) {
  const items = {
    items: {
      instructors: true,
      milestones: true,
      modules: true,
      quizes: true,
      videos: true,
    },
    filters:{
        enrolled:true
    },
  };

  const result = await fetch(`${BACKEND}/course/get-courses`, {
    method: 'POST',
    headers: {
      Authorization: payload.user.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(items)
  });
  const data = await result.json();
  return data;
}

export {getAllCourses, getEnrolledCourses};
