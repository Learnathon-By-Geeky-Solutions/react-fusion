import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useApi from '@/src/hooks/useApi';
import { checkVideo } from '@/src/services/video';

export default function AISummaryComponent({ videoId, onSummaryGenerated }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summaryType, setSummaryType] = useState({
    descriptive: false,
    concise: false,
    bulletPoints: false,
    highlights: false,
    actionItems: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { fetchData } = useApi();
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSummaryTypeChange = (type) => {
    setSummaryType((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const generatePrompt = (videoUrl, videoTitle) => {
    let prompt = `Generate a summary for this video: ${videoUrl}. `;
    prompt += `The title of the video is "${videoTitle}". `;
    prompt +=
      'The summary should be in English. Make it without any bullets, bolds or any types of formating. For points, use new lines. ';

    const selectedTypes = Object.entries(summaryType)
      .filter(([_, isSelected]) => isSelected)
      .map(([type]) => type);

    if (selectedTypes.length === 0) {
      prompt += 'Provide a balanced summary of the key points.';
      return prompt;
    }

    prompt += 'The summary should be ';

    if (summaryType.descriptive) {
      prompt += 'detailed and descriptive, ';
    }

    if (summaryType.concise) {
      prompt += 'concise and to the point, ';
    }

    if (summaryType.bulletPoints) {
      prompt += 'formatted as bullet points, ';
    }

    if (summaryType.highlights) {
      prompt += 'focusing on the main highlights, ';
    }

    if (summaryType.actionItems) {
      prompt += 'including actionable takeaways, ';
    }

    return prompt.slice(0, -2) + '.';
  };

  const generateSummary = async () => {
    if (!videoId) return;

    setIsLoading(true);
    setError('');

    try {
      const videoResponse = await fetchData(checkVideo, { videoId });

      if (!videoResponse.success || !videoResponse.data?.url) {
        throw new Error('Failed to retrieve video URL');
      }

      const videoUrl = videoResponse.data.url;
      const videoTitle = videoResponse.data.title || 'Video';
      const prompt = generatePrompt(videoUrl, videoTitle);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.candidates || data.candidates.length === 0) {
        throw new Error(data.error?.message || 'Failed to generate summary');
      }

      const summaryText =
        data.candidates[0].content?.parts[0]?.text || 'No summary generated';
      const formattedSummary = 'AI Summary\n\n' + summaryText;

      onSummaryGenerated(formattedSummary);
      handleCloseModal();
    } catch (error) {
      console.error('Error generating summary:', error);
      setError(error.message || 'Failed to generate summary');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2'
        disabled={!videoId}
      >
        <span>✨</span> AI Summary
      </button>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Generate AI Summary</h3>
              <button
                onClick={handleCloseModal}
                className='text-gray-500 hover:text-gray-700'
              >
                ✕
              </button>
            </div>

            <div className='mb-4'>
              <p className='text-gray-600 mb-2'>Select summary options:</p>
              <div className='grid grid-cols-2 gap-2'>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    checked={summaryType.descriptive}
                    onChange={() => handleSummaryTypeChange('descriptive')}
                    className='rounded text-purple-500'
                  />
                  <span>Descriptive</span>
                </label>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    checked={summaryType.concise}
                    onChange={() => handleSummaryTypeChange('concise')}
                    className='rounded text-purple-500'
                  />
                  <span>Concise</span>
                </label>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    checked={summaryType.bulletPoints}
                    onChange={() => handleSummaryTypeChange('bulletPoints')}
                    className='rounded text-purple-500'
                  />
                  <span>Bullet Points</span>
                </label>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    checked={summaryType.highlights}
                    onChange={() => handleSummaryTypeChange('highlights')}
                    className='rounded text-purple-500'
                  />
                  <span>Highlights</span>
                </label>
                <label className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    checked={summaryType.actionItems}
                    onChange={() => handleSummaryTypeChange('actionItems')}
                    className='rounded text-purple-500'
                  />
                  <span>Action Items</span>
                </label>
              </div>
            </div>

            {error && (
              <div className='mb-4 p-2 bg-red-50 text-red-500 rounded'>
                {error}
              </div>
            )}

            <div className='flex justify-end gap-2'>
              <button
                onClick={handleCloseModal}
                className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                onClick={generateSummary}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg ${
                  isLoading
                    ? 'bg-purple-300 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600'
                } text-white`}
              >
                {isLoading ? 'Generating...' : 'Generate Summary'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

AISummaryComponent.propTypes = {
  videoId: PropTypes.string.isRequired,
  onSummaryGenerated: PropTypes.func.isRequired
};
