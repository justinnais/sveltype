import { describe, it, expect } from 'vitest';
import { calculateRawWPM } from '$lib/utils';
import { calculateNetWPM } from '$lib/utils/calculateWPM';

describe('raw wpm', () => {
  it('should get 40wpm over 1 minute', () => {
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
  it('should get 40wpm over 1 minute with no errors', () => {
    expect(calculateNetWPM(200, 0, 60000)).toBe(40);
  });

  it('should get 76wpm over 1 minute with 4 errors', () => {
    expect(calculateNetWPM(400, 4, 60000)).toBe(76);
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

  it('should handle negative or zero inputs', () => {
    expect(() => calculateNetWPM(-1, -1, -1)).toThrowError('Invalid input');
    expect(() => calculateNetWPM(0, 0, 0)).toThrowError('Invalid input');
  });

  it('should return 0 if wpm is negative', () => {
    expect(calculateNetWPM(10, 8, 60000)).toBe(0);
  });

  const sets = [
    { chars: 123, time: 15000 },
    { chars: 400, time: 60000 },
    { chars: 103, time: 10000 },
    { chars: 130, time: 9000 },
    { chars: 1000, time: 60000 },
    { chars: 1153, time: 43465 }
  ];

  it.each(sets)('should return 0 if 20% of the characters are errors', ({ chars, time }) => {
    expect(calculateNetWPM(chars, chars / 5, time)).toBe(0);
  });

  it.each(sets)(
    'should return half the raw wpm if 10% of the characters are errors',
    ({ chars, time }) => {
      const raw = calculateRawWPM(chars, time / 60000);
      const net = calculateNetWPM(chars, chars / 10, time);
      expect(net).toBeCloseTo(Number((raw / 2).toFixed(2)), 1);
    }
  );
});
