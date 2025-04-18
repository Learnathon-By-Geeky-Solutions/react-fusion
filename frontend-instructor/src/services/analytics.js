import { BACKEND } from '../constants';

const getAnalyticsByCourse = async (params) => {
  const response = await fetch(
    `${BACKEND}/analytics/instructor/${params.data.courseId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: params.instructor.token
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch analytics data');
  }
  const resJson = await response.json();
  console.log(resJson);
  return resJson;
};

export async function getProfile(params) {
  try {
    const result = await fetch(`${BACKEND}/user/profile`, {
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

export const analyticsService = { getAnalyticsByCourse };
