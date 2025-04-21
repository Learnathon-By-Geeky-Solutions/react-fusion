import React, { useEffect, useState } from 'react';
import useApi from '@/src/hooks/useApi';
import PropTypes from 'prop-types';

import {
  getNote,
  createNote,
  updateNote,
  deleteNote
} from '@/src/services/note';

export default function NotesSection({ videoId }) {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchData } = useApi();

  useEffect(() => {
    if (videoId) {
      fetchNoteData();
      setIsEditing(false);
    }
  }, [videoId]);

  const fetchNoteData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchData(getNote, { videoId });

      if (response.success) {
        if (response.data) {
          // Data exists, set saved note and current note
          setSavedNote(response.data);
          setNote(response.data.note || '');
        } else {
          // Success but no data means no existing note
          setSavedNote(null);
          setNote('');
        }
      } else {
        // Handle actual error case
        setSavedNote(null);
        setNote('');
        console.error('Failed to fetch note:', response.message);
      }
    } catch (error) {
      console.error('Error fetching note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!videoId || !note.trim()) return;

    setIsLoading(true);
    try {
      let noteData = {
        videoId,
        note: note
      };

      let response;
      if (savedNote && savedNote.id) {
        response = await fetchData(updateNote, noteData);
      } else {
        response = await fetchData(createNote, noteData);
      }

      if (response.success) {
        setSavedNote(response.data);
        setIsEditing(false);
        fetchNoteData();
      } else {
        console.error('Failed to save note:', response.message);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async () => {
    if (!videoId || !savedNote) return;

    setIsLoading(true);
    try {
      const response = await fetchData(deleteNote, {
        videoId
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (savedNote) {
      setIsEditing(false);
      setNote(savedNote.note || '');
    } else {
      setNote('');
    }
  };

  // Extract the nested ternary for the save button className into a function
  const getSaveButtonClassName = () => {
    const isButtonEnabled = note.trim() && !isLoading;
    if (isButtonEnabled) {
      return 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition';
    } else {
      return 'bg-blue-300 cursor-not-allowed text-white px-4 py-2 rounded-lg transition';
    }
  };

  // Determine button text based on state
  const getSaveButtonText = () => {
    if (isLoading) {
      return 'Saving...';
    } else if (savedNote) {
      return 'Save Changes';
    } else {
      return 'Create Note';
    }
  };

  return (
    <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold'>Note</h2>
        {savedNote && !isEditing && (
          <div className='flex gap-2'>
            <button
              onClick={() => setIsEditing(true)}
              className='text-blue-500 hover:text-blue-700 transition'
              title='Edit Note'
              disabled={isLoading}
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDeleteNote}
              className='text-red-500 hover:text-red-700 transition'
              title='Delete Note'
              disabled={isLoading}
            >
              🗑️ Remove
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className='flex justify-center my-4'>
          <div className='animate-pulse text-gray-400'>Loading...</div>
        </div>
      )}

      {!isLoading && (isEditing || !savedNote) ? (
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
                onClick={handleCancel}
                className='bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition'
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSaveNote}
              disabled={!note.trim() || isLoading}
              className={getSaveButtonClassName()}
            >
              {getSaveButtonText()}
            </button>
          </div>
        </>
      ) : (
        !isLoading && (
          <div className='mt-2 p-3 bg-white rounded-lg min-h-[100px] whitespace-pre-wrap text-left'>
            {savedNote?.note || 'No notes yet.'}
          </div>
        )
      )}
    </div>
  );
}

NotesSection.propTypes = {
  videoId: PropTypes.string.isRequired
};
