import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getYouTubeEmbedUrl } from './videoUtils';
import { checkVideo } from '@/src/services/video';
import useApi from '@/src/hooks/useApi';

export default function VideoSection({ videoId, title }) {
  const [videoData, setVideoData] = useState(null);
  const { fetchData } = useApi();

  useEffect(() => {
    async function fetchVideoData() {
      try {
        const response = await fetchData(checkVideo, { videoId });
        if (response.success) {
          setVideoData(response.data);
        } else {
          console.error('Failed to fetch video data:', response.message);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    }

    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]);

  const embedUrl = React.useMemo(() => {
    if (!videoData?.url) return null;
    const baseUrl = getYouTubeEmbedUrl(videoData.url);
    return baseUrl ? `${baseUrl}&enablejsapi=1` : null;
  }, [videoData?.url]);

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
      <div className='w-full aspect-video bg-black'>
        {embedUrl ? (
          <iframe
            className='w-full h-full'
            src={embedUrl}
            title={title || 'YouTube Video'}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        ) : (
          <div className='w-full h-full flex items-center justify-center text-white'>
            {videoData === null ? 'Loading video...' : 'Invalid YouTube URL'}
          </div>
        )}
      </div>
    </div>
  );
}

VideoSection.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
