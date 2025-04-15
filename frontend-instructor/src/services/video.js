import { BACKEND } from '../constants';

export async function addVideo(params) {
  try {
    const result = await fetch(`${BACKEND}/video/`, {
      method: 'POST',
      headers: {
        Authorization: params.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error adding video:', error);
    return { success: false };
  }
}

export async function updateVideo(params) {
  try {
    const result = await fetch(`${BACKEND}/video/${params.data.videoId}`, {
      method: 'PUT',
      headers: {
        Authorization: params.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error updating video:', error);
    return { success: false };
  }
}

export async function deleteVideo(params) {
  try {
    const result = await fetch(`${BACKEND}/video/${params.data.videoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: params.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error delete video:', error);
    return { success: false };
  }
}

export async function checkVideo(params) {
  try {
    const result = await fetch(`${BACKEND}/video/${params.videoId}`, {
      method: 'GET',
      headers: {
        Authorization: params.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching video data:', error);
    return { success: false };
  }
}
