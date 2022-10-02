import { GameState, type Game } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export const baseState: Game = {
  words: [],
  currentWord: null,
  currentChars: [],
  typedChars: [],
  errors: {
    total: 0,
    uncorrected: 0
  },
  state: GameState.WAITING,
  time: {}
};

export const game: Writable<Game> = writable(baseState);
