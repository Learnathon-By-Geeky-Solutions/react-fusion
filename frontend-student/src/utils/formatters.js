/**
 * Formats seconds into a human-readable time string
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string (e.g., "2h 30m 15s")
 */
export function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0) parts.push(`${mins}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}

/**
 * Calculate percentage safely
 * @param {number} numerator - The top number
 * @param {number} denominator - The bottom number
 * @returns {number} Percentage rounded to nearest integer
 */
export function calculatePercentage(numerator, denominator) {
  if (!denominator || denominator === 0) return 0;
  return Math.round((numerator / denominator) * 100);
}
