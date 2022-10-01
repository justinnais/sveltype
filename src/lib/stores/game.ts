import type { IWord } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

enum GameState {
  NotStarted,
  Started,
  Ended
}
interface Game {
  words: IWord[];
  currentWord: IWord;
  currentChars: string[];
  typedChars: string[];
  errorCount: number;
  state: GameState;
  time: {
    start?: number;
    end?: number;
  };
}
export const game: Writable<Game> = writable();
