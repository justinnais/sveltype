import type { IWord } from '$lib/types/types';

/**
 * Converts words into characters
 * @param words array of word object to convert
 * @returns array of characters
 */
export function wordsToChars(words: IWord[]) {
  return words.flatMap(({ characters }) => characters);
}
