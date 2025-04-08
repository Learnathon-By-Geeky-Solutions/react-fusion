import { BACKEND } from '../constants';

export async function getVideo(payload) {
  console.log('videoData', payload);
  try {
    const result = await fetch(`${BACKEND}/video/${payload.data.videoId}`, {
      method: 'GET',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching video:', error);
    return { success: false };
  }
}
