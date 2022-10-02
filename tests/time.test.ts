import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { calculateWPM, calculateRawWPM, calculateNetWPM, durationToMilliseconds } from '$lib/utils';

describe('raw wpm', () => {
  it('should get 40wpm over 1 minute', () => {
    expect(calculateRawWPM(200, durationToMilliseconds({ minutes: 1 }))).toBe(40);
  });

  it('should get 80wpm over 30 seconds', () => {
    expect(calculateRawWPM(200, durationToMilliseconds({ seconds: 30 }))).toBe(80);
  });

  it('should get 123.6wpm over 10 seconds', () => {
    expect(calculateRawWPM(103, durationToMilliseconds({ seconds: 10 }))).toBe(123.6);
  });

  it('should get 173.33wpm over 9 seconds', () => {
    expect(calculateRawWPM(130, durationToMilliseconds({ seconds: 9 }))).toBe(173.33);
  });

  it('should get 0wpm over a minute', () => {
    expect(calculateRawWPM(0, durationToMilliseconds({ minutes: 1 }))).toBe(0);
  });

  it('should be infinity if no time has elapsed', () => {
    expect(calculateRawWPM(200, 0)).toBe(Infinity);
  });
});

describe('net wpm', () => {
  it('should get 40wpm over 1 minute with no errors', () => {
    expect(calculateNetWPM(200, 0, durationToMilliseconds({ minutes: 1 }))).toBe(40);
  });

  it('should get 76wpm over 1 minute with 4 errors', () => {
    expect(calculateNetWPM(400, 4, durationToMilliseconds({ minutes: 1 }))).toBe(76);
  });

  it('should get 123.6wpm over 10 seconds', () => {
    expect(calculateNetWPM(103, 0, durationToMilliseconds({ seconds: 10 }))).toBe(123.6);
  });

  it('should get 173.33wpm over 9 seconds', () => {
    expect(calculateNetWPM(130, 0, durationToMilliseconds({ seconds: 9 }))).toBe(173.33);
  });

  it('should get 0wpm over a minute', () => {
    expect(calculateNetWPM(0, 0, durationToMilliseconds({ minutes: 1 }))).toBe(0);
  });

  it('should handle negative or zero inputs', () => {
    expect(() => calculateNetWPM(-1, -1, -1)).toThrowError('Invalid input');
    expect(() => calculateNetWPM(0, 0, 0)).not.toThrowError();
  });

  it('should return 0 if wpm is negative', () => {
    expect(calculateNetWPM(10, 8, durationToMilliseconds({ minutes: 1 }))).toBe(0);
  });

  const sets = [
    { chars: 123, time: durationToMilliseconds({ seconds: 30 }) },
    { chars: 400, time: durationToMilliseconds({ minutes: 1 }) },
    { chars: 103, time: durationToMilliseconds({ seconds: 10 }) },
    { chars: 130, time: durationToMilliseconds({ seconds: 9 }) },
    { chars: 1000, time: durationToMilliseconds({ minutes: 1 }) },
    { chars: 1153, time: durationToMilliseconds({ seconds: 43 }) },
    {
      chars: 12345678,
      time: durationToMilliseconds({ days: 1, hours: 23, minutes: 59, seconds: 59 })
    }
  ];

  it.each(sets)('should return 0 if 20% of the characters are errors', ({ chars, time }) => {
    expect(calculateNetWPM(chars, chars / 5, time)).toBe(0);
  });

  it.each(sets)(
    'should return half the raw wpm if 10% of the characters are errors',
    ({ chars, time }) => {
      const raw = calculateRawWPM(chars, time);
      const net = calculateNetWPM(chars, chars / 10, time);
      expect(net).toBeCloseTo(Number((raw / 2).toFixed(2)), 1);
    }
  );
});

// TODO - I'm unsure of exactly how to mock time correctly in vitest, this section needs cleanup and better tests

const executeAfterOneMinute = (func: () => void) => {
  setTimeout(func, durationToMilliseconds({ minutes: 1 }));
};

const mock = vi.fn((chars, errors, time) => calculateWPM(chars, errors, time));

describe('calculate wpm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const typedChars: string[] = new Array(200).fill('a');

  it('should should wait one minute', () => {
    const startTime = new Date();
    executeAfterOneMinute(() => console.log(startTime));
    vi.runAllTimers();
    const endTime = new Date();
    expect(endTime.getTime() - startTime.getTime()).toBe(durationToMilliseconds({ minutes: 1 }));
  });

  it('should return work with a mock', () => {
    const startTime = new Date();
    executeAfterOneMinute(() => mock(typedChars, 0, startTime.getTime()));
    vi.runAllTimers();
    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should return the correct raw and net wpm', () => {
    const time = new Date();
    vi.advanceTimersByTime(durationToMilliseconds({ minutes: 1 }));
    const wpm = calculateWPM(typedChars, 0, time.getTime());
    expect(wpm.raw).toBe(40);
    expect(wpm.net).toBe(40);
  });

  it('should return the correct raw and net wpm', () => {
    const time = new Date();
    vi.advanceTimersByTime(durationToMilliseconds({ minutes: 1 }));
    const wpm = calculateWPM(typedChars, 10, time.getTime());
    expect(wpm.raw).toBe(40);
    expect(wpm.net).toBe(30);
  });
});
