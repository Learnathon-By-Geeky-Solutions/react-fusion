import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { checkVideo } from '@/src/services/video';
import { updateVideoProgress } from '@/src/services/progress';
import useApi from '@/src/hooks/useApi';
import ReactPlayer from 'react-player/youtube';

export default function VideoSection({ videoId, title }) {
  const [videoData, setVideoData] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [hasSeekAndStarted, setHasSeekAndStarted] = useState(false);
  const playerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const { fetchData } = useApi();

  useEffect(() => {
    async function fetchVideoData() {
      try {
        const response = await fetchData(checkVideo, { videoId });
        if (response.success) {
          setVideoData(response.data);

          if (response.data.progress != null) {
            setCompleted(response.data.progress.isCompleted);

            if (response.data.progress) {
              setStartTime(response.data.progress.VideoProgress.timeWatched);
              setCurrentTime(response.data.progress.VideoProgress.timeWatched);
            }
          }
        } else {
          console.error('Failed to fetch video data:', response.message);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    }

    if (videoId) {
      fetchVideoData();
      setHasSeekAndStarted(false);
    }

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }

    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        if (playerRef.current) {
          const timeWatched = Math.floor(playerRef.current.getCurrentTime());
          setCurrentTime(timeWatched);

          if (timeWatched % 60 === 0 && timeWatched > 0) {
            updateProgress(timeWatched, completed);
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

  useEffect(() => {
    if (playerRef.current && startTime > 0 && !hasSeekAndStarted) {
      const seekTimer = setTimeout(() => {
        playerRef.current.seekTo(startTime);
        setIsPlaying(true);
        setHasSeekAndStarted(true);
      }, 500);

      return () => clearTimeout(seekTimer);
    }
  }, [startTime, playerRef.current, hasSeekAndStarted]);

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoDuration > 0) {
      updateProgress(videoDuration, false);
      try {
        const response_update = fetchData(checkVideo, { videoId });
        if (response_update.data.progress != null) {
          setCompleted(response_update.data.progress.isCompleted);
        } else {
          console.error('Failed to fetch video data:', response_update.message);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    }
  };

  const updateProgress = async (timeWatched, isCompleted) => {
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
    if (playerRef.current) {
      const timeWatched = Math.floor(playerRef.current.getCurrentTime());
      updateProgress(timeWatched, completed);
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
                  rel: 0,
                  start: startTime > 0 ? Math.floor(startTime) : undefined
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
    </div>
  );
}

VideoSection.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string
};
