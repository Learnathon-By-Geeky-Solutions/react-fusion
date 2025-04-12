import { BACKEND } from '../constants';

export async function profile(payload) {
  try {
    const response = await fetch(`${BACKEND}/user/profile`, {
      method: 'GET',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching profile data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
}
