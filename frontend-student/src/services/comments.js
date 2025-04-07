import { BACKEND } from '../constants';

// Get Comments
export async function getComments(commentData) {
  try {
    const result = await fetch(`${BACKEND}/comment/get-comments`, {
      method: 'POST',
      headers: {
        Authorization: commentData.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ videoId: commentData.videoId })
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { success: false };
  }
}

// Create Comment
export async function createComment(commentData) {
  try {
    const result = await fetch(`${BACKEND}/comment/create-comment`, {
      method: 'POST',
      headers: {
        Authorization: commentData.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        videoId: commentData.videoId,
        comment: commentData.comment
      })
    });

    const data = await result.json();
    return data;
  } catch (error) {
    return { success: false };
  }
}

// Update Comment
export async function updateComment(commentData) {
  try {
    const result = await fetch(`${BACKEND}/comment/update-comment`, {
      method: 'PUT',
      headers: {
        Authorization: commentData.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        commentId: commentData.commentId,
        comment: commentData.comment
      })
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error updating comment:', error);
    return { success: false };
  }
}

// Delete Comment
export async function deleteComment(commentData) {
  try {
    const result = await fetch(
      `${BACKEND}/comment/delete-comment/${commentData.commentId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: commentData.token
        }
      }
    );

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    return { success: false };
  }
}
