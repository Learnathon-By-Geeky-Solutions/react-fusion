import { BACKEND } from '../constants';

const getAnalytics = async (params) => {
  const response = await fetch(`${BACKEND}/analytics/instructor-all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: params.instructor.token
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analytics data');
  }
  const resJson = await response.json();
  return resJson;
};

export const dashboardService = { getAnalytics };
