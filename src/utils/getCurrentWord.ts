import type { IWord } from 'src/types/types';

export function getCurrentWord(words: IWord[], currentChars: string[]) {
  // find the id of the word we are at based on the length of current char array
  // TODO probably can be optimised
  const index = currentChars.length - 1;

  const currentWord = words.find((word) => {
    return word.characters.find((char) => char.id === index);
  });

  return currentWord;
}
