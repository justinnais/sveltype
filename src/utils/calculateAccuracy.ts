import type { IWord } from 'src/types/types';
import { wordsToChars } from './wordsToChars';

export function calculateAccuracy(
  currentChars: string[],
  typedChars: string[],
  words: IWord[]
): number {
  // TODO update this to do calc based on all errors
  const count = currentChars.length;
  // const completed = wordsToChars(words).slice(0, count);
  // const correct = currentChars
  //   .map((item, i) => item === completed[i].char)
  //   .filter((item) => item === true);
  // const accuracy = parseInt(((correct.length * 100) / count).toFixed(0));

  // Update these to combine both methods of accuracy calc
  const accuracy = parseInt(
    ((currentChars.length / typedChars.length) * 100).toFixed(0)
  );
  return accuracy;
}
