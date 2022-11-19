import { GameState, type Game, type GameMode } from '$lib/types';
import { generateWords, getUncorrectedErrors } from '$lib/utils';
import { writable } from 'svelte/store';

const defaultValues = {
  mode: 'TIME',
  count: 30
} as const;

// 50 words to start when using time, when half way through, push another 50 - this will be an issue with current way of creating IWords

const baseState: Game = {
  ...defaultValues,
  words: generateWords(50),
  currentWord: null,
  characters: [],
  allCharacters: [],
  errors: {
    total: 0,
    uncorrected: 0
  },
  state: GameState.WAITING,
  time: {
    start: 0,
    end: 0
  }
};

function createGameStore() {
  const { subscribe, set, update } = writable({ ...baseState });

  const reset = (mode: GameMode = 'TIME', count = 30) => {
    // this does weird stuff with obj copy, have to manually reset each value
    // set({ ...baseState, words: generateWords(40) });
    set({
      mode,
      count,
      words: generateWords(mode === 'WORDS' ? count : 50),
      currentWord: null,
      characters: [],
      allCharacters: [],
      errors: {
        total: 0,
        uncorrected: 0
      },
      state: GameState.WAITING,
      time: {
        start: 0,
        end: 0
      }
    });
  };

  return {
    subscribe,
    set,
    reset,
    end: () =>
      update((state) => ({
        ...state,
        errors: {
          ...state.errors,
          uncorrected: getUncorrectedErrors(state.characters, state.words)
        },
        state: GameState.ENDED,
        time: { ...state.time, end: Date.now() }
      })),
    start: () =>
      update((state) => ({
        ...state,
        state: GameState.STARTED,
        time: { ...state.time, start: Date.now() }
      })),
    changeSettings: (mode: GameMode, count: number) => reset(mode, count)
  };
}

export const game = createGameStore();
