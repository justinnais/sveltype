import type { wpmMetrics } from '$lib/types';

const MINUTE_AS_MILLISECONDS = 60000;

// https://www.100utils.com/how-to-calculate-typing-speed-wpm-and-accuracy/

/**
 * Calculates both raw and net words per minute
 * @param allCharacters all characters typed
 * @param uncorrectedErrors errors that were not corrected
 * @param startTime time when the test started
 * @returns net and raw wpm as an object
 */
export function calculateWPM(
  allCharacters: string[],
  uncorrectedErrors: number,
  startTime: number
): wpmMetrics {
  const duration = Date.now() - startTime;

  return {
    net: calculateNetWPM(allCharacters.length, uncorrectedErrors, duration),
    raw: calculateRawWPM(allCharacters.length, duration)
  };
}

/**
 * @param characters all characters typed including errors, spaces. Exluding backspaces and modifiers
 * @param milliseconds millseconds elapsed since start
 * @returns raw typing speed in words per minute
 */
export function calculateRawWPM(characters: number, milliseconds: number): number {
  const words = characters / 5;
  const minutes = milliseconds / MINUTE_AS_MILLISECONDS;
  return Number((words / minutes).toFixed(2));
}

/**
 * @param characters count of all characters typed including errors, spaces. Exluding backspaces and modifiers
 * @param uncorrectedErrors count of errors left uncorrected
 * @param milliseconds milliseconds elapsed since start
 * @returns net typing speed in words per minute
 */
export function calculateNetWPM(
  characters: number,
  uncorrectedErrors: number,
  milliseconds: number
): number {
  if (characters < 0 || milliseconds < 0) {
    throw new Error('Invalid input');
  }

  // above check was throwing errors sometimes as could be 0 ms. 1ms for first calc is fine
  if (milliseconds === 0) {
    milliseconds += 1;
  }

  const raw = calculateRawWPM(characters, milliseconds);

  const minutes = milliseconds / MINUTE_AS_MILLISECONDS;
  const net = raw - uncorrectedErrors / minutes;

  if (isNaN(net)) throw new Error('net is NaN');

  return net < 0 ? 0 : Number(net.toFixed(2));
}
