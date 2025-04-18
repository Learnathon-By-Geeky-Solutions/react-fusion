import { BACKEND } from '../constants';

export async function addCourse(params) {
  try {
    const result = await fetch(`${BACKEND}/course/`, {
      method: 'POST',
      headers: {
        Authorization: params.instructor.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error adding course:', error);
    return { success: false };
  }
}

export async function updateCourse(params) {
  try {
    const result = await fetch(`${BACKEND}/course/${params.data.courseId}`, {
      method: 'PUT',
      headers: {
        Authorization: params.instructor.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data.courseData)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error updating course:', error);
    return { success: false };
  }
}

export async function deleteCourse(params) {
  try {
    const result = await fetch(`${BACKEND}/course/${params.data.courseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: params.instructor.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error delete course:', error);
    return { success: false };
  }
}

export async function checkEnrollmentCourse(params) {
  try {
    const result = await fetch(
      `${BACKEND}/course/checkenroll/${params.courseId}`,
      {
        method: 'GET',
        headers: {
          Authorization: params.instructor.token
        }
      }
    );

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching enrollment data:', error);
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

export async function getAllCourses(params) {
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
  return data;
}

export async function getCourseById(params) {
  const result = await fetch(`${BACKEND}/course/${params.data.courseId}`, {
    headers: {
      Authorization: params.instructor.token
    }
  });
  const resJson = await result.json();
  return resJson;
}
