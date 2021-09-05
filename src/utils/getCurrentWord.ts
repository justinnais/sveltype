import type { IWord } from 'src/types/types';

export function getCurrentWord(words: IWord[], currentChars: string[]) {
  // find the id of the word we are at based on the length of current char array
  // TODO probably can be optimised
  const index = currentChars.length - 1;
  console.log(index);

  const currentWord = words.find((word) => {
    word.characters.forEach((char) => {
      console.log(char);

      return char.id === index;
    });
  });

  console.log(currentWord);

  return currentWord;
}
