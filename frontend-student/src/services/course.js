import { BACKEND } from '../constants';

export async function getAllCourses(payload) {
  const items = {
    items: {
      instructors: true,
      milestones: true,
      modules: true,
      moduleItems: true
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

export async function getEnrolledCourses(payload) {
  const items = {
    items: {
      instructors: true,
      milestones: true,
      modules: true,
      quizes: true,
      videos: true
    },
    filters: {
      enrolled: true
    }
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

export async function buyCourse(payload) {
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
    return data;
  } catch (error) {
    console.error('Error buying course:', error);
    return { success: false };
  }
}

export async function getSingleCourse(params) {
  try {
    const result = await fetch(`${BACKEND}/course/${params.data.courseId}`, {
      method: 'GET',
      headers: {
        Authorization: params.instructor.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching enrollment data:', error);
    return { success: false };
  }
}

export async function priceFilter(params) {
  const items = {
    items: {
      instructors: true,
      milestones: true,
      modules: true,
      moduleItems: true
    },
    sortBy: {
      price: params.data.filter
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

export async function ratingFilter(params) {
  const items = {
    items: {
      instructors: true,
      milestones: true,
      modules: true,
      moduleItems: true
    },
    sortBy: {
      rating: params.data.filter
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
