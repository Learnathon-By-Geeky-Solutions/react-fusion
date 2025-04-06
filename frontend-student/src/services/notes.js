import { BACKEND } from '../constants';

// Create Note
export async function createNote(noteData) {
  try {
    const result = await fetch(`${BACKEND}/note/create`, {
      method: 'POST',
      headers: {
        Authorization: noteData.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteData.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    return { success: false };
  }
}

// Get Notes
export async function getNote(noteData) {
  try {
    const result = await fetch(`${BACKEND}/note/get`, {
      method: 'POST',
      headers: {
        Authorization: noteData.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ videoId: noteData.videoId })
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error getting note:', error);
    return { success: false };
  }
}

// Update Note
export async function updateNote(noteData) {
  try {
    const result = await fetch(`${BACKEND}/note/update`, {
      method: 'POST',
      headers: {
        Authorization: noteData.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteData.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error updating note:', error);
    return { success: false };
  }
}

// Delete Note
export async function deleteNote(noteData) {
  try {
    const result = await fetch(`${BACKEND}/note/delete`, {
      method: 'DELETE',
      headers: {
        Authorization: noteData.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ videoId: noteData.videoId })
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error deleting note:', error);
    return { success: false };
  }
}
