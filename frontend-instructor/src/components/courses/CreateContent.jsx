// src/components/ContentManagement/ContentPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import VideoForm from '@/src/components/courseManagement/VideoForm';
import QuizForm from '@/src/components/courseManagement/QuizForm';
import ContentList from '../courseManagement/ContentList';

const ContentPage = () => {
  const { moduleId } = useParams();
  const [activeForm, setActiveForm] = useState('video');
  const [refreshList, setRefreshList] = useState(0);

  return (
    <div className='max-w-6xl container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Add Content to Module</h1>

      <div className='flex space-x-4 mb-6'>
        <button
          onClick={() => setActiveForm('video')}
          className={`px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            activeForm === 'video'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Add Video
        </button>

        <button
          onClick={() => setActiveForm('quiz')}
          className={`px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            activeForm === 'quiz'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Add Quiz
        </button>
      </div>

      {activeForm === 'video' && (
        <VideoForm
          moduleId={moduleId}
          onSuccess={() => {
            alert('Video added successfully!');
            setRefreshList((prev) => prev + 1);
          }}
        />
      )}

      {activeForm === 'quiz' && (
        <QuizForm
          moduleId={moduleId}
          onSuccess={() => {
            alert('Quiz added successfully!');
            setRefreshList((prev) => prev + 1);
          }}
        />
      )}

      {/* Placeholder for content list that will be implemented later */}
      <div className='mt-8'>
        <h2 className='text-xl font-semibold mb-4'>Content List</h2>
        <ContentList moduleId={moduleId} refreshTrigger={refreshList} />
      </div>
    </div>
  );
};

export default ContentPage;
