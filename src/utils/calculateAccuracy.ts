import type { IWord } from 'src/types/types';
import { wordsToChars } from './wordsToChars';

export function calculateAccuracy(
  currentChars: string[],
  errors: number
): number {
  const charLength = currentChars.length;
  const accuracy = parseInt(
    (((charLength - errors) / charLength) * 100).toFixed(0)
  );
  if (accuracy < 0) {
    return 0;
  }

  return accuracy;
}
