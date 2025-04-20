import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getYouTubeEmbedUrl } from './videoUtils';
import { checkVideo } from '@/src/services/video';
import { updateVideoProgress } from '@/src/services/progress';
import useApi from '@/src/hooks/useApi';
import ReactPlayer from 'react-player/youtube';

export default function VideoSection({ videoId, title }) {
  const [videoData, setVideoData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const playerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const { fetchData } = useApi();

  // Fetch video data
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

    // Cleanup timer on unmount
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [videoId]);

  // Setup progress tracking
  useEffect(() => {
    // Clear any existing timer
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }

    // Only set up timer if video is playing
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        // Get current time from player
        if (playerRef.current) {
          const timeWatched = Math.floor(playerRef.current.getCurrentTime());
          setCurrentTime(timeWatched);

          // Send progress update every 10 seconds
          if (timeWatched % 10 === 0 && timeWatched > 0) {
            updateProgress(timeWatched);
          }
        }
      }, 1000);
    }

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlaying, videoId]);

  // Update progress when video completes
  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoDuration > 0) {
      updateProgress(videoDuration, true);
    }
  };

  // Function to update progress
  const updateProgress = async (timeWatched, isCompleted = false) => {
    try {
      await fetchData(updateVideoProgress, {
        videoId,
        isCompleted,
        timeWatched
      });
    } catch (error) {
      console.error('Error updating video progress:', error);
    }
  };

  // Handle player state changes
  const handlePlayerReady = () => {
    if (playerRef.current) {
      setVideoDuration(playerRef.current.getDuration());
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    // Update progress when paused
    if (playerRef.current) {
      const timeWatched = Math.floor(playerRef.current.getCurrentTime());
      updateProgress(timeWatched);
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden mb-6'>
      <div className='w-full aspect-video bg-black'>
        {videoData?.url ? (
          <ReactPlayer
            ref={playerRef}
            url={videoData.url}
            width='100%'
            height='100%'
            controls={true}
            playing={isPlaying}
            onReady={handlePlayerReady}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleVideoEnded}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0
                }
              }
            }}
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-white'>
            {videoData === null ? 'Loading video...' : 'Invalid YouTube URL'}
          </div>
        )}
      </div>
      {videoData && currentTime > 0 && (
        <div className='p-3 text-sm text-gray-600'>
          Progress: {Math.floor((currentTime / videoDuration) * 100)}%
        </div>
      )}
    </div>
  );
}

VideoSection.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string
};
