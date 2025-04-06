import { BACKEND } from '../constants';

// Get Comments
export async function getComments({ token, videoId }) {
  try {
    const response = await fetch(`${BACKEND}/comment/get-comments`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ videoId })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { success: false };
  }
}

// Create Comment
export async function createComment({ token, videoId, comment }) {
  try {
    const response = await fetch(`${BACKEND}/comment/create-comment`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ videoId, comment })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating comment:', error);
    return { success: false };
  }
}

// Update Comment
export async function updateComment({ token, commentId, comment }) {
  try {
    const response = await fetch(`${BACKEND}/comment/update-comment`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ commentId, comment })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating comment:', error);
    return { success: false };
  }
}

// Delete Comment
export async function deleteComment({ token, commentId }) {
  try {
    const response = await fetch(
      `${BACKEND}/comment/delete-comment/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false };
  }
}
