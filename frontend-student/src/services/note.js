import { BACKEND } from '../constants';

export async function createNote(payload) {
  console.log('Creating note with payload:', payload.data);
  try {
    const result = await fetch(`${BACKEND}/note/create`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.data)
    });

    const data = await result.json();
    console.log('Create note result:', data);
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    return { success: false };
  }
}

export async function getNote(payload) {
  try {
    const result = await fetch(`${BACKEND}/note/get`, {
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
    console.error('Error getting note:', error);
    return { success: false };
  }
}

export async function updateNote(payload) {
  try {
    const result = await fetch(`${BACKEND}/note/update`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JSON.parse(payload.data))
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
    const result = await fetch(`${BACKEND}/note/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JSON.parse(payload.data))
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error deleting note:', error);
    return { success: false };
  }
}
