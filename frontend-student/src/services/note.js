import { BACKEND } from '../constants';

export async function createNote(payload) {
  try {
    const result = await fetch(`${BACKEND}/note`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    return { success: false };
  }
}

export async function getNote(payload) {
  try {
    const result = await fetch(`${BACKEND}/note/${payload.data.videoId}`, {
      method: 'GET',
      headers: {
        Authorization: payload.user.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error getting note:', error);
    return { success: false };
  }
}

export async function updateNote(payload) {
  try {
    const result = await fetch(`${BACKEND}/note`, {
      method: 'PUT',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error updating note:', error);
    return { success: false };
  }
}

// Delete Note
export async function deleteNote(payload) {
  try {
    const result = await fetch(`${BACKEND}/note/${payload.data.videoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: payload.user.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error getting note:', error);
    return { success: false };
  }
}
