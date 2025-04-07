import React, { useEffect, useState } from 'react';
import { getVideo } from '@/src/services/getVideo';

export default function VideoSection({ videoId, title }) {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    fetchVideoData(videoId);
  }, [videoId]);

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

  return (
    <div>
      {/* YouTube Video Player */}
      <div className='w-full aspect-video bg-black rounded-lg overflow-hidden'>
        {videoData && videoData.url && getYouTubeEmbedUrl(videoData.url) ? (
          <iframe
            className='w-full h-full'
            src={getYouTubeEmbedUrl(videoData.url)}
            title={title}
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
    </div>
  );
}
