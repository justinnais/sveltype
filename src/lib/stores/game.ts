import { GameState, type Game, type GameMode } from '$lib/types';
import { generateWords, getUncorrectedErrors } from '$lib/utils';
import { writable } from 'svelte/store';
// 50 words to start when using time, when half way through, push another 50 - this will be an issue with current way of creating IWords

const baseState: Game = {
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
  const { subscribe, set, update } = writable<Game>({ ...baseState });

  const reset = (mode?: GameMode, count?: number) => {
    // this does weird stuff with obj copy, have to manually reset each value
    // set({ ...baseState, words: generateWords(40) });

    if (!mode || !count) {
      // throw new Error('TODO get values from settings store - too hard right now');
      mode = 'TIME';
      count = 30;
    }

    set({
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
      }))
  };
}

export const game = createGameStore();
