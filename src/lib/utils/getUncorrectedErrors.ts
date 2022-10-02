import type { IWord } from '$lib/types';
import { wordsToString } from '$lib/utils';

export function getUncorrectedErrors(characters: string[], words: IWord[]) {
  const sentence = wordsToString(words);
  let uncorrected = 0;

  for (let i = 0; i < characters.length; i++) {
    if (characters[i] !== sentence[i]) {
      uncorrected++;
    }
  }

  return uncorrected;
}
