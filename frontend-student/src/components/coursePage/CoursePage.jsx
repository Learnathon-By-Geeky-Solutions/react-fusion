import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSingleCourse from '@/src/services/singleCourse';
import { getVideo } from '@/src/services/getVideo';
import {
  getNote,
  createNote,
  updateNote,
  deleteNote
} from '@/src/services/notes'; // Import notes services
import {
  getComments,
  createComment,
  updateComment,
  deleteComment
} from '@/src/services/comments'; // Import comments services

export default function LecturePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openMilestones, setOpenMilestones] = useState({});
  const [openModules, setOpenModules] = useState({});
  const [videoData, setVideoData] = useState(null);

  // Notes state
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Comments state
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await getSingleCourse(id);
        if (response.success) {
          setCourse(response.data);
          // Default first video selection
          const firstMilestone = response.data.milestones?.[0];
          const firstModule = firstMilestone?.modules?.[0];
          const firstVideo = firstModule?.videos?.[0];

          // Initialize first milestone and module as open
          if (firstMilestone) {
            setOpenMilestones({ [firstMilestone.id]: true });
            if (firstModule) {
              setOpenModules({ [firstModule.id]: true });
            }
          }

          if (firstVideo) {
            const videoWithNumbers = {
              ...firstVideo,
              milestoneNumber: 1,
              moduleNumber: 1,
              videoNumber: 1
            };
            setSelectedVideo(videoWithNumbers);

            // Fetch video data for first video
            fetchVideoData(firstVideo.id);
            fetchNoteData(firstVideo.id);
            fetchComments(firstVideo.id);
          }
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  // Function to fetch video data
  const fetchVideoData = async (videoId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await getVideo({
        videoId,
        token
      });

      if (response.success) {
        setVideoData(response.data);
      } else {
        console.error('Failed to fetch video data:', response.message);
      }
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  // Function to fetch note data
  const fetchNoteData = async (videoId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await getNote({
        videoId,
        token
      });

      if (response.success && response.data) {
        setSavedNote(response.data);
        setNote(response.data.content || '');
      } else {
        setSavedNote(null);
        setNote('');
      }
    } catch (error) {
      console.error('Error fetching note:', error);
    }
  };

  // Function to fetch comments
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

  // Function to save note
  const handleSaveNote = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!selectedVideo) return;

      const noteData = {
        videoId: selectedVideo.id,
        content: note
      };

      let response;

      if (savedNote) {
        // Update existing note
        response = await updateNote({
          token,
          data: {
            id: savedNote.id,
            ...noteData
          }
        });
      } else {
        // Create new note
        response = await createNote({
          token,
          data: noteData
        });
      }

      if (response.success) {
        setSavedNote(response.data);
        setIsEditing(false);
      } else {
        console.error('Failed to save note:', response.message);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  // Function to delete note
  const handleDeleteNote = async () => {
    try {
      if (!selectedVideo || !savedNote) return;

      const token = localStorage.getItem('token');

      const response = await deleteNote({
        videoId: selectedVideo.id,
        token
      });

      if (response.success) {
        setSavedNote(null);
        setNote('');
        setIsEditing(false);
      } else {
        console.error('Failed to delete note:', response.message);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Function to add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedVideo) return;

    try {
      const token = localStorage.getItem('token');

      const response = await createComment({
        token,
        videoId: selectedVideo.id,
        comment: newComment
      });

      if (response.success) {
        // Refresh comments to get the newly added comment with all its properties
        fetchComments(selectedVideo.id);
        setNewComment('');
      } else {
        console.error('Failed to add comment:', response.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Function to start editing comment
  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.comment);
  };

  // Function to save edited comment
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
        fetchComments(selectedVideo.id);
        cancelEditComment();
      } else {
        console.error('Failed to update comment:', response.message);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  // Function to cancel comment editing
  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditCommentText('');
  };

  // Function to delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await deleteComment({
        token,
        commentId
      });

      if (response.success) {
        // Remove the deleted comment from the state
        setComments(comments.filter((comment) => comment.id !== commentId));
      } else {
        console.error('Failed to delete comment:', response.message);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const toggleMilestone = (milestoneId) => {
    setOpenMilestones((prev) => ({
      ...prev,
      [milestoneId]: !prev[milestoneId]
    }));
  };

  const toggleModule = (moduleId) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Function to extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    // Extract the video ID from different YouTube URL formats
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  // Handle video selection
  const handleVideoSelect = async (
    video,
    milestoneNumber,
    moduleNumber,
    videoNumber
  ) => {
    const videoWithNumbers = {
      ...video,
      milestoneNumber,
      moduleNumber,
      videoNumber
    };

    setSelectedVideo(videoWithNumbers);
    setIsEditing(false);
    await fetchVideoData(video.id);
    await fetchNoteData(video.id);
    await fetchComments(video.id);
  };

  if (loading) return <p className='text-center text-lg'>Loading lecture...</p>;
  if (!course)
    return <p className='text-center text-red-500'>Course not found.</p>;

  return (
    <div className='max-w-[1280px] mx-auto py-8 grid grid-cols-1 md:grid-cols-3 gap-12'>
      {/* Left Side - Video & Notes */}
      <div className='md:col-span-2'>
        {selectedVideo && (
          <>
            {/* Video Title */}
            <h1 className='text-2xl font-bold mb-4'>
              {selectedVideo.milestoneNumber}.{selectedVideo.moduleNumber}.
              {selectedVideo.videoNumber} - {selectedVideo.title}
            </h1>

            {/* YouTube Video Player */}
            <div className='w-full aspect-video bg-black rounded-lg overflow-hidden'>
              {videoData &&
              videoData.url &&
              getYouTubeEmbedUrl(videoData.url) ? (
                <iframe
                  className='w-full h-full'
                  src={getYouTubeEmbedUrl(videoData.url)}
                  title={selectedVideo.title}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              ) : (
                <div className='w-full h-full flex items-center justify-center text-white'>
                  {videoData ? 'Invalid YouTube URL' : 'Loading video...'}
                </div>
              )}
            </div>

            {/* Like & Dislike Buttons */}
            <div className='mt-4 flex items-center space-x-4'>
              <button className='bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition'>
                👍 {videoData?.likeCount || 0}
              </button>
              <button className='bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition'>
                👎 {videoData?.dislikeCount || 0}
              </button>
            </div>

            {/* Notes Section */}
            <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold'>Notes</h2>
                <div className='flex gap-2'>
                  {!isEditing && savedNote && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className='text-blue-500 hover:text-blue-700 transition'
                        title='Edit Note'
                      >
                        ✏️
                      </button>
                      <button
                        onClick={handleDeleteNote}
                        className='text-red-500 hover:text-red-700 transition'
                        title='Delete Note'
                      >
                        ❌
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isEditing || !savedNote ? (
                <>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className='w-full mt-2 p-2 border rounded-lg min-h-[100px]'
                    placeholder='Take notes here...'
                  />
                  <div className='flex justify-end gap-2 mt-2'>
                    {isEditing && (
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setNote(savedNote?.content || '');
                        }}
                        className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition'
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={handleSaveNote}
                      className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'
                    >
                      Save Note
                    </button>
                  </div>
                </>
              ) : (
                <div className='mt-2 p-3 bg-white rounded-lg min-h-[100px] whitespace-pre-wrap'>
                  {savedNote?.content || 'No notes yet.'}
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className='mt-6 p-4 bg-gray-100 rounded-lg shadow-md'>
              <h2 className='text-lg font-semibold text-gray-800 mb-3'>
                Comments
              </h2>

              {/* Add Comment Form */}
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
                    <div
                      key={comment.id}
                      className='bg-white p-4 rounded-lg shadow'
                    >
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
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
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
                                  onClick={() =>
                                    handleDeleteComment(comment.id)
                                  }
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
          </>
        )}
      </div>

      {/* Right Sidebar - Course Navigation */}
      <div className='md:col-span-1 bg-gray-100 p-4 rounded-lg shadow-md'>
        <h2 className='text-lg font-semibold mb-3 text-black'>
          Course Content
        </h2>
        <div className='space-y-2'>
          {course.milestones.map((milestone, mIndex) => (
            <div key={milestone.id} className='mb-2'>
              {/* Milestone Toggle */}
              <button
                onClick={() => toggleMilestone(milestone.id)}
                className='font-medium text-black px-2 py-2 bg-gray-300 rounded-md w-full text-left flex justify-between items-center'
              >
                <span>{milestone.title}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${openMilestones[milestone.id] ? 'transform rotate-180' : ''}`}
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  ></path>
                </svg>
              </button>

              {/* Milestone Content */}
              <div
                className={`mt-1 ${openMilestones[milestone.id] ? 'block' : 'hidden'}`}
              >
                {milestone.modules.map((module, modIndex) => (
                  <div key={module.id} className='bg-gray-200 rounded-md mb-1'>
                    {/* Module Toggle */}
                    <button
                      onClick={() => toggleModule(module.id)}
                      className='text-[14px] font-medium text-gray-800 px-4 py-2 w-full text-left flex justify-between items-center'
                    >
                      <span>{module.title}</span>
                      <svg
                        className={`w-3 h-3 transition-transform ${openModules[module.id] ? 'transform rotate-180' : ''}`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M19 9l-7 7-7-7'
                        ></path>
                      </svg>
                    </button>

                    {/* Module Videos */}
                    <div
                      className={`pb-2 ${openModules[module.id] ? 'block' : 'hidden'}`}
                    >
                      {module.videos.map((video, vIndex) => (
                        <button
                          key={video.id}
                          onClick={() =>
                            handleVideoSelect(
                              video,
                              mIndex + 1,
                              modIndex + 1,
                              vIndex + 1
                            )
                          }
                          className={`block w-full text-left text-sm px-6 py-2 mx-4 rounded-md ${
                            selectedVideo?.id === video.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-50 hover:bg-blue-100'
                          }`}
                        >
                          {mIndex + 1}.{modIndex + 1}.{vIndex + 1} -{' '}
                          {video.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
