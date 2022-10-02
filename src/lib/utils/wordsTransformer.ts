import type { IWord, IChar } from '$lib/types';

/**
 * Converts words into characters
 * @param words array of word object to convert
 * @returns array of characters
 */
export function wordsToChars(words: IWord[]): IChar[] {
  return words.flatMap(({ characters }) => characters);
}

export function wordsToString(words: IWord[]): string {
  return words.map(({ word }) => word).join('');
}
