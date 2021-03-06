import type { IWord } from 'src/types/types';

/**
 * Converts words into characters
 * @param words array of word object to convert
 * @returns array of characters
 */
export function wordsToChars(words: IWord[]) {
  return words.map((word) => word.characters).flat();
}
