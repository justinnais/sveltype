import { GameState, type Game } from '$lib/types';
import { writable } from 'svelte/store';

export const baseState: Game = {
  words: [],
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
  const { subscribe, set, update } = writable(baseState);

  return {
    subscribe,
    set,
    reset: () => set(baseState),
    end: () =>
      update((state) => ({
        ...state,
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
