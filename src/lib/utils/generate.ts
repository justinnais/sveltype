import type { IWord } from '$lib/types';
import english from '$lib/data/languages/english1k.json';

export function generateWords(count: number): IWord[] {
  if (count < 0 || isNaN(count)) {
    throw new Error('count must be a positive number');
  }

  return getDetailedWords(Array.from({ length: count }, () => getWord()));
}

export function getDetailedWords(words: string[]): IWord[] {
  const wordsArr: IWord[] = [];
  let charId = -1;
  for (let id = 0; id < words.length; id++) {
    const isLastWord: boolean = id === words.length - 1;
    let word = words[id];

    // if not the last word add a space
    if (!isLastWord) {
      word = `${word} `;
    }
    // split word into chars
    const chars = word.split('');

    const characters: { char: string; id: number }[] = [];
    chars.forEach((char) => {
      const id = (charId += 1);
      characters.push({ char, id });
    });

    wordsArr[id] = { word, characters, id };
  }
  return wordsArr;
}

function getWord() {
  const words = english.words;
  return words[Math.floor(Math.random() * words.length)];
}
