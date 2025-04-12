import { BACKEND } from '../constants';

export async function profile(payload) {
  try {
    const result = await fetch(`${BACKEND}/user/profile`, {
      method: 'GET',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { success: false };
  }
}
