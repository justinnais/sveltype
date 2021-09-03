import type { IWord } from 'src/types/types';
import { currentTime } from './timeLogic';

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
  const duration = (currentTime() - startTime) / 60000;

  return parseInt(
    (currentChars.length / averageWordLength / duration).toFixed(2)
  );
}
