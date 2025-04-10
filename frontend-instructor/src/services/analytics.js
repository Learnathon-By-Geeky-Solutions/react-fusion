import { BACKEND } from '../constants';

const getAnalyticsByCourse = async (params) => {
  console.log('🚀 params : ', params);
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

export const analyticsService = { getAnalyticsByCourse };
