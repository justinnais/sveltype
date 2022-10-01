import type { IWord } from '$lib/types/types';
import { wordsToChars, getCurrentTime } from '$lib/utils';

// https://www.100utils.com/how-to-calculate-typing-speed-wpm-and-accuracy/

/**
 * @todo refactor this to use calculateNetWPM function
 * @param words 
 * @param currentChars 
 * @param startTime 
 * @returns 
 */
export function calculateWPM(words: IWord[], currentChars: string[], startTime: number): number {
  const wordCount = words.length;
  const characterCount = wordsToChars(words).length;
  const averageWordLength = characterCount / wordCount;
  const duration = (getCurrentTime() - startTime) / 60000;

  const wpm = parseInt((currentChars.length / averageWordLength / duration).toFixed(2));

  return isNaN(wpm) ? 0 : wpm;
}

/**
 * @param characters all characters typed including errors, spaces. Exluding backspaces and modifiers
 * @param minutes minutes elapsed since start
 * @returns raw typing speed in words per minute
 */
export function calculateRawWPM(characters: number, minutes: number): number {
  const words = characters / 5;
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
  if (characters < 0 || milliseconds <= 0) {
    throw new Error('Invalid input');
  }

  const minutes = milliseconds / 60000;
  const raw = calculateRawWPM(characters, minutes);

  const net = raw - uncorrectedErrors / minutes;

  if (isNaN(net)) throw new Error('net is NaN');

  return net < 0 ? 0 : Number(net.toFixed(2));
}
