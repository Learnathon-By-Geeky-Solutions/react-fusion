import { BACKEND } from '../constants';

export async function checkVideo(params) {
  try {
    const result = await fetch(`${BACKEND}/video/${params.data.videoId}`, {
      method: 'GET',
      headers: {
        Authorization: params.user.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching video data:', error);
    return { success: false };
  }
}
