import type { Duration } from '$lib/types';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 *
 * @param duration
 * @returns duration object as millisecond timestamp
 *
 */
export function durationToMilliseconds(duration: Duration): number {
  const { days, hours, minutes, seconds } = duration;
  return (
    (days || 0) * DAY + (hours || 0) * HOUR + (minutes || 0) * MINUTE + (seconds || 0) * SECOND
  );
}
