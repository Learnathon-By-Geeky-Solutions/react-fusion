import React, { useEffect, useState } from 'react';
import avatar from '@/src/assets/avatar.svg';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment
} from '@/src/services/comments';
import { ChevronDown, ChevronUp, Edit2, Trash2, Send, X } from 'lucide-react';

export default function CommentsSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

    if (isNaN(date.getTime())) return 'Invalid date';

    // Format as "Apr 7, 2025 • 1:54 PM"
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className='mt-6 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200'>
      {/* Header with toggle */}
      <div
        className='flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white cursor-pointer'
        onClick={toggleCollapse}
      >
        <div className='flex items-center space-x-2'>
          <h2 className='text-lg font-semibold'>
            Comments ({comments.length})
          </h2>
        </div>
        <div className='flex items-center'>
          {isCollapsed ? (
            <ChevronDown className='h-5 w-5' />
          ) : (
            <ChevronUp className='h-5 w-5' />
          )}
        </div>
      </div>

      {/* Collapsible content */}
      {!isCollapsed && (
        <div className='p-4'>
          {/* Add comment form */}
          <form onSubmit={handleAddComment} className='mb-6'>
            <div className='flex items-start space-x-2'>
              <div className='flex-shrink-0'>
                <img
                  src={avatar}
                  alt='Your avatar'
                  className='w-10 h-10 rounded-full border-2 border-blue-500'
                />
              </div>
              <div className='flex-grow relative'>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder='Add your thoughts...'
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-20'
                  rows={3}
                />
                <button
                  type='submit'
                  className='absolute bottom-3 right-3 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50'
                  disabled={!newComment.trim()}
                  title='Post comment'
                >
                  <Send className='h-4 w-4' />
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className='space-y-4'>
            {loadingComments ? (
              <div className='flex justify-center items-center p-6'>
                <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500'></div>
              </div>
            ) : comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className='p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow'
                >
                  {editingCommentId === comment.id ? (
                    <div className='space-y-3'>
                      <textarea
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        rows={3}
                      />
                      <div className='flex justify-end gap-2'>
                        <button
                          onClick={cancelEditComment}
                          className='flex items-center gap-1 px-3 py-1 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors text-sm'
                        >
                          <X className='h-4 w-4' /> Cancel
                        </button>
                        <button
                          onClick={handleSaveEditedComment}
                          className='flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm'
                          disabled={!editCommentText.trim()}
                        >
                          <Send className='h-4 w-4' /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className='flex justify-between items-start'>
                        <div className='flex items-start'>
                          <div className='flex-shrink-0 mr-3'>
                            <img
                              src={comment.user?.image || avatar}
                              alt={`${comment.user?.name || 'Anonymous'}'s avatar`}
                              className='w-10 h-10 rounded-full border border-gray-200'
                            />
                          </div>
                          <div className='flex-1'>
                            <div className='font-medium text-gray-900'>
                              {comment.user?.name || 'Anonymous'}
                            </div>
                            <div className='text-xs text-gray-500 mb-2'>
                              {formatDate(comment.createdAt)}
                            </div>
                            <p className='text-gray-700'>{comment.comment}</p>
                          </div>
                        </div>
                        {(comment.isOwner ||
                          (comment.userId &&
                            comment.userId ===
                              localStorage.getItem('userId'))) && (
                          <div className='flex gap-2 ml-3'>
                            <button
                              onClick={() => handleEditComment(comment)}
                              className='p-1 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100 transition-colors'
                              title='Edit Comment'
                            >
                              <Edit2 className='h-4 w-4' />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className='p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors'
                              title='Delete Comment'
                            >
                              <Trash2 className='h-4 w-4' />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300'>
                <p className='text-gray-500 italic'>
                  No comments yet. Be the first to start the conversation!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
