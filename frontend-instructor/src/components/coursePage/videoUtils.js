export const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp =
    /(?:youtu\.be\/|v\/|u\/\w+\/|embed\/|watch\?v=|&v=)([^#&?]{11})/;
  const match = url.match(regExp);
  return match
    ? `https://www.youtube.com/embed/${match[1]}?modestbranding=1&rel=0`
    : null;
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
};
