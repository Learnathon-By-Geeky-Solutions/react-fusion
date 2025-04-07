import React, { useEffect, useState } from 'react';
import { getNote, createNote, updateNote, deleteNote } from '@/src/services/notes';

export default function NotesSection({ videoId }) {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (videoId) {
      fetchNoteData(videoId);
      setIsEditing(false);
    }
  }, [videoId]);

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

  // Function to save note
  const handleSaveNote = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!videoId) return;

      const noteData = {
        videoId: videoId,
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
      if (!videoId || !savedNote) return;

      const token = localStorage.getItem('token');

      const response = await deleteNote({
        videoId: videoId,
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

  return (
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
  );
}