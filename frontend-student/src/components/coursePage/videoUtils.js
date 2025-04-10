// videoUtils.js
/**
 * Extracts YouTube video ID from various URL formats
 *
 * @param {string} url
 * @returns {string|null}
 */
export const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?modestbranding=1&rel=0`
    : null;
};

/**
 * Format video progress time to display format
 *
 * @param {number} seconds - Time in seconds
 * @returns {string} - Formatted time string (MM:SS)
 */
export const formatVideoTime = (seconds) => {
  if (!seconds) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};
