import { describe, it, expect } from 'vitest';
import { generateWords } from '$lib/utils';
import { getDetailedWords, listOfWords } from '$lib/utils/generate';

describe('word generation', () => {
  it('should generate 0 words', () => {
    const words = generateWords(0);
    expect(words.length).toBe(0);
  });

  it('should generate 15 words', () => {
    const words = generateWords(15);
    expect(words.length).toBe(15);
  });

  it('should generate 100 words', () => {
    const words = generateWords(100);
    expect(words.length).toBe(100);
  });

  it('should handle negative numbers', () => {
    expect(() => generateWords(-1)).toThrowError('count must be a positive number');
  });

  it('should handle NaN', () => {
    expect(() => generateWords(NaN)).toThrowError('count must be a positive number');
  });
});

describe('character generation', () => {
  const words = getDetailedWords(listOfWords);

  words.forEach(({ word, characters, id }, wordIndex) => {
    it(`should have an id of ${wordIndex}`, () => {
      expect(id).toBe(wordIndex);
    });

    it('should have the same number of chars as the word', () => {
      expect(characters.length).toBe(word.length);
    });

    it('should have characters matching their parent word', () => {
      word.split('').forEach((char, index) => {
        expect(characters[index].char).toBe(char);
      });
    });
  });

  it('should have character ids matching their position in entire word array', () => {
    const allChars = words.flatMap(({ characters }) => characters);
    allChars.forEach(({ char, id }, index) => {
      expect(id).toBe(index);
    });
  });
});
