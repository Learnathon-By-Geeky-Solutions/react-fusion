import { BACKEND } from '../constants';

// Get Comments
export async function getComments(payload) {
  try {
    const result = await fetch(`${BACKEND}/comment/get-comments`, {
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
    console.error('Error fetching comments:', error);
    return { success: false };
  }
}

// Create Comment
export async function createComment(payload) {
  try {
    const result = await fetch(`${BACKEND}/comment/create-comment`, {
      method: 'POST',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        videoId: payload.data.videoId,
        comment: payload.data.newComment
      })
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error creating comment:', error);
    return { success: false };
  }
}

// Update Comment
export async function updateComment(payload) {
  try {
    const result = await fetch(`${BACKEND}/comment/update-comment`, {
      method: 'PUT',
      headers: {
        Authorization: payload.user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        commentId: payload.data.editingCommentId,
        comment: payload.data.editCommentText
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
export async function deleteComment(payload) {
  try {
    const parsedData = JSON.parse(payload.data);
    const result = await fetch(
      `${BACKEND}/comment/delete-comment/${parsedData.commentId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: payload.user.token
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