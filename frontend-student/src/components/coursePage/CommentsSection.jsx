import React, { useEffect, useState } from 'react';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment
} from '@/src/services/comments';

export default function CommentsSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (videoId) {
      fetchComments(videoId);
    }
  }, [videoId]);

  const fetchComments = async (videoId) => {
    if (!videoId) return;

    setLoadingComments(true);
    try {
      const token = localStorage.getItem('token');

      const response = await getComments({
        videoId,
        token
      });

      if (response.success) {
        setComments(response.data || []);
      } else {
        console.error('Failed to fetch comments:', response.message);
        setComments([]);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !videoId) return;

    try {
      const token = localStorage.getItem('token');

      const response = await createComment({
        token,
        videoId,
        comment: newComment
      });

      if (response.success) {
        fetchComments(videoId);
        setNewComment('');
      } else {
        console.error('Failed to add comment:', response.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.comment);
  };

  const handleSaveEditedComment = async () => {
    if (!editCommentText.trim()) return;

    try {
      const token = localStorage.getItem('token');

      const response = await updateComment({
        token,
        commentId: editingCommentId,
        comment: editCommentText
      });

      if (response.success) {
        // Refresh comments to show updated comment
        fetchComments(videoId);
        cancelEditComment();
      } else {
        console.error('Failed to update comment:', response.message);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditCommentText('');
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await deleteComment({
        token,
        commentId
      });

      if (response.success) {
        setComments(comments.filter((comment) => comment.id !== commentId));
      } else {
        console.error('Failed to delete comment:', response.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
  };

  return (
    <div className='mt-6 p-4 bg-gray-100 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold text-gray-800 mb-3'>Comments</h2>

      <form onSubmit={handleAddComment} className='mb-4'>
        <div className='flex'>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder='Add a comment...'
            className='flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            rows={2}
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition'
            disabled={!newComment.trim()}
          >
            Post
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className='mt-4 space-y-3'>
        {loadingComments ? (
          <div className='bg-white p-4 rounded-lg shadow'>
            <p className='text-gray-700'>Loading comments...</p>
          </div>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className='bg-white p-4 rounded-lg shadow'>
              {editingCommentId === comment.id ? (
                <div className='space-y-2'>
                  <textarea
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    rows={2}
                  />
                  <div className='flex justify-end gap-2'>
                    <button
                      onClick={cancelEditComment}
                      className='bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition text-sm'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEditedComment}
                      className='bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-sm'
                      disabled={!editCommentText.trim()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className='flex justify-between items-start'>
                    <div className='flex items-center mb-2'>
                      <span className='font-medium text-gray-900'>
                        {comment.user?.name || 'Anonymous'}
                      </span>
                      <span className='text-xs text-gray-500 ml-2'>
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    {comment.isOwner && (
                      <div className='flex gap-2'>
                        <button
                          onClick={() => handleEditComment(comment)}
                          className='text-blue-500 hover:text-blue-700 transition'
                          title='Edit Comment'
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className='text-red-500 hover:text-red-700 transition'
                          title='Delete Comment'
                        >
                          ❌
                        </button>
                      </div>
                    )}
                  </div>
                  <p className='text-gray-700'>{comment.comment}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className='bg-white p-4 rounded-lg shadow'>
            <p className='text-gray-700'>
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}