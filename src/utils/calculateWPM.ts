import type { IWord } from 'src/types/types';
import { getCurrentTime } from './timeLogic';

export function calculateWPM(
  words: IWord[],
  currentChars: string[],
  startTime: number
): number {
  const wordCount = words.length;
  const characterCount = words
    .map((word) => word.characters)
    .flat()
    .map((char) => char.char).length;
  const averageWordLength = characterCount / wordCount;
  const duration = (getCurrentTime() - startTime) / 60000;

  const wpm = parseInt(
    (currentChars.length / averageWordLength / duration).toFixed(2)
  );

  return isNaN(wpm) ? 0 : wpm;
}
