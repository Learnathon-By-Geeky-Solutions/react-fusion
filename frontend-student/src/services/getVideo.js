import { BACKEND } from '../constants';

export async function getVideo(videoData) {
  try {
    const result = await fetch(`${BACKEND}/video/${videoData.videoId}`, {
      method: 'GET',
      headers: {
        Authorization: videoData.token,
        'Content-Type': 'application/json'
      }
    });

    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching video:', error);
    return { success: false };
  }
}
