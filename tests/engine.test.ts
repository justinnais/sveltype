import { describe, expect, it } from 'vitest';
import { generateWords, getCurrentWord } from '$lib/utils';
import { getDetailedWords } from '$lib/utils/generate';
describe('getCurrentWord', () => {
  const words = getDetailedWords(['hello', 'world']);
  it('should return the current word', () => {
    const currentWord = getCurrentWord(words, ['h', 'e', 'l', 'l', 'o']);
    expect(currentWord).toEqual(words[0]);
  });

  it('should handle an empty char array', () => {
    const currentWord = getCurrentWord(words, []);
    // TODO i'm not sure this is the correct behaviour I want
    // expect(currentWord).toEqual(words[0]);
    expect(currentWord).toBeUndefined();
  });

  it('should handle an empty words array', () => {
    const currentWord = getCurrentWord([], ['h', 'e', 'l', 'l', 'o']);
    expect(currentWord).toBeUndefined();
  });

  it('should handle more chars than words', () => {
    const currentWord = getCurrentWord(words, [
      'h',
      'e',
      'l',
      'l',
      'o',
      ' ',
      'w',
      'o',
      'r',
      'l',
      'd',
      '!'
    ]);
    expect(currentWord).toBeUndefined();
  });
});

describe('performance test', () => {
  const start = performance.now();
  // TODO I'd like this be handle more than 1000 words
  const words = generateWords(1000);
  getCurrentWord(
    words,
    words.flatMap((word) => word.characters.flatMap((char) => char.char))
  );
  const end = performance.now();
  it('should be fast', () => {
    expect(end - start).toBeLessThan(10);
  });
});
