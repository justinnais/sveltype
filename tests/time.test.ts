import { describe, it, expect } from 'vitest';
import { calculateRawWPM, calculateWPM } from '$lib/utils';
import { calculateNetWPM } from '$lib/utils/calculateWPM';
import { getDetailedWords } from '$lib/utils/generate';

// describe('wpm', () => {
//   it('should handle empty words array', () => {
//     expect(calculateWPM([], [], 0)).toBe(0);
//   });

//   const words = getDetailedWords(['hello', 'world']);
//   const chars = ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'];

//   it('should get 100wpm', () => {
//     expect(calculateWPM(words, chars, 0)).toBe(100);
//   });
// });

describe('raw wpm', () => {
  it('should get 40wpm over a minute', () => {
    expect(calculateRawWPM(200, 1)).toBe(40);
  });

  it('should get 80wpm over 30 seconds', () => {
    expect(calculateRawWPM(200, 0.5)).toBe(80);
  });

  it('should get 123.6wpm over 10 seconds', () => {
    expect(calculateRawWPM(103, 0.16667)).toBe(123.6);
  });

  it('should get 173.33wpm over 9 seconds', () => {
    expect(calculateRawWPM(130, 0.15)).toBe(173.33);
  });

  it('should get 0wpm over a minute', () => {
    expect(calculateRawWPM(0, 1)).toBe(0);
  });

  it('should be infinity if no time has elapsed', () => {
    expect(calculateRawWPM(200, 0)).toBe(Infinity);
  });
});

describe('net wpm', () => {
  it('should get 40wpm over a minute with no errors', () => {
    expect(calculateNetWPM(200, 0, 60000)).toBe(40);
  });

  it('should get 80wpm over 30 seconds', () => {
    expect(calculateNetWPM(200, 0, 30000)).toBe(80);
  });

  it('should get 123.6wpm over 10 seconds', () => {
    expect(calculateNetWPM(103, 0, 10000)).toBe(123.6);
  });

  it('should get 173.33wpm over 9 seconds', () => {
    expect(calculateNetWPM(130, 0, 9000)).toBe(173.33);
  });

  it('should get 0wpm over a minute', () => {
    expect(calculateNetWPM(0, 0, 60000)).toBe(0);
  });

  it('should handle negative or zero values', () => {
    expect(() => calculateNetWPM(-1, -1, -1)).toThrowError('Invalid input');
    expect(() => calculateNetWPM(0, 0, 0)).toThrowError('Invalid input');
  });
});
