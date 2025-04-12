import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { getVideo } from '@/src/services/getVideo';
import { video } from '@/src/services/progress';
import useApi from '@/src/hooks/useApi';
import { getYouTubeEmbedUrl } from './videoUtils';

export default function VideoSection({ videoId, title }) {
  const [videoData, setVideoData] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const { fetchData } = useApi();
  const timerRef = useRef(null);
  const playerRef = useRef(null);
  const lastUpdateRef = useRef(Date.now());
  const isPlayingRef = useRef(false);

  // Fetch video data only once at the beginning
  const fetchVideoData = useCallback(
    async (id) => {
      try {
        const payload = { videoId: id };
        const response = await fetchData(getVideo, payload);

        if (response.success) {
          setVideoData(response.data);

          // Set the starting position from saved progress
          if (response.data.timeWatched && response.data.timeWatched > 0) {
            setCurrentTime(response.data.timeWatched);
          }
        } else {
          console.error('Failed to fetch video data:', response.message);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    },
    [fetchData]
  );

  // Update progress to the server - only called when needed
  const updateProgress = useCallback(async () => {
    if (!videoId || !playerRef.current) return;

    try {
      // Only update if player is available and can get current time
      if (typeof playerRef.current.getCurrentTime === 'function') {
        const playerTime = playerRef.current.getCurrentTime();

        // Update local state with current player time
        setCurrentTime(playerTime);

        const payload = {
          videoId,
          isCompleted: false,
          timeWatched: playerTime
        };

        await fetchData(video, payload);
        lastUpdateRef.current = Date.now();
      }
    } catch (error) {
      console.error('Error updating video progress:', error);
    }
  }, [videoId, fetchData]);

  // Mark video as complete
  const markAsComplete = useCallback(async () => {
    if (!videoId) return;

    try {
      const payload = {
        videoId,
        isCompleted: true,
        timeWatched: 0
      };
      const response = await fetchData(video, payload);

      if (response.success) {
        // Update local state to reflect completion
        setVideoData((prevData) => ({
          ...prevData,
          isCompleted: true
        }));

        // Clear any pending updates
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    } catch (error) {
      console.error('Error marking video as complete:', error);
    }
  }, [videoId, fetchData]);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    return () => {
      // Clear interval on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Save progress one last time when component unmounts, but only if we were playing
      if (isPlayingRef.current) {
        updateProgress();
      }
    };
  }, [updateProgress]);

  // Set up initial data fetch
  useEffect(() => {
    if (videoId) {
      // Fetch video data only once when component mounts or videoId changes
      fetchVideoData(videoId);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [videoId, fetchVideoData]);

  // Create embed URL with starting position
  const embedUrl = React.useMemo(() => {
    if (!videoData?.url) return null;

    const baseUrl = getYouTubeEmbedUrl(videoData.url);
    // Include start parameter in the URL for initial position
    if (baseUrl && currentTime > 0) {
      return `${baseUrl}&start=${Math.floor(currentTime)}&enablejsapi=1&autoplay=1&mute=1`;
    }
    return `${baseUrl}&enablejsapi=1&autoplay=1&mute=1`;
  }, [videoData?.url, currentTime]);

  // Handle iframe load and setup YouTube player
  const handleIframeLoad = (event) => {
    if (!window.YT || !window.YT.Player) return;

    try {
      playerRef.current = new window.YT.Player(event.target, {
        events: {
          onStateChange: (e) => {
            // YT.PlayerState.PLAYING = 1
            if (e.data === 1) {
              isPlayingRef.current = true;

              // Start update timer only when video starts playing
              if (!timerRef.current) {
                // Update progress every 10 seconds while playing
                timerRef.current = setInterval(() => {
                  // Only update if it's been at least 10 seconds since last update
                  if (Date.now() - lastUpdateRef.current >= 10000) {
                    updateProgress();
                  }
                }, 10000);
              }
            }
            // YT.PlayerState.PAUSED = 2
            else if (e.data === 2) {
              isPlayingRef.current = false;

              // Clear the interval when paused to stop backend updates
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }

              // Update progress once when paused
              updateProgress();
            }
            // YT.PlayerState.ENDED = 0
            else if (e.data === 0) {
              isPlayingRef.current = false;

              // Clear the interval when ended
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }

              // Automatically mark as complete
              markAsComplete();
            }
          }
        }
      });
    } catch (error) {
      console.error('Error setting up YouTube player:', error);
    }
  };

  return (
    <div>
      <div className='w-full aspect-video bg-black rounded-lg overflow-hidden'>
        {embedUrl ? (
          <iframe
            className='w-full h-full'
            src={embedUrl}
            title={title || 'YouTube Video'}
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            onLoad={handleIframeLoad}
          ></iframe>
        ) : (
          <div className='w-full h-full flex items-center justify-center text-white'>
            {videoData === null ? 'Loading video...' : 'Invalid YouTube URL'}
          </div>
        )}
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <button className='bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition'>
            👍 {videoData?.likeCount || 0}
          </button>
          <button className='bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition'>
            👎 {videoData?.dislikeCount || 0}
          </button>
        </div>

        <button
          onClick={markAsComplete}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center'
        >
          {videoData?.isCompleted ? 'Completed' : 'Mark as Complete'}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 ml-1'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

VideoSection.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
