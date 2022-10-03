import { GameState, type Game } from '$lib/types';
import { generateWords, getUncorrectedErrors } from '$lib/utils';
import { writable } from 'svelte/store';

const baseState: Game = {
  words: generateWords(30),
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

  return {
    subscribe,
    set,
    reset: () => {
      // this does weird stuff with obj copy, have to manually reset each value
      // set({ ...baseState, words: generateWords(30) });
      set({
        words: generateWords(30),
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
    },
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
