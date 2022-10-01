import { describe, it, expect } from 'vitest';
import { calculateAccuracy } from '$lib/utils';

describe('accuracy', () => {
  const currentChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  it('should have 100% accuracy', () => {
    expect(calculateAccuracy(currentChars, 0)).toBe(100);
  });

  it('should have 0% accuracy', () => {
    expect(calculateAccuracy(currentChars, currentChars.length)).toBe(0);
  });

  it('should handle more errors than characters', () => {
    expect(calculateAccuracy(currentChars, currentChars.length + 1)).toBe(0);
  });

  it('should handle empty chars array', () => {
    expect(calculateAccuracy([], 0)).toBe(0);
  });

  it('should handle NaN errors', () => {
    expect(() => calculateAccuracy(currentChars, NaN)).toThrowError(
      'errors must be a positive number'
    );
  });

  it('should handle negative errors', () => {
    expect(() => calculateAccuracy(currentChars, -1)).toThrowError(
      'errors must be a positive number'
    );
  });
});
