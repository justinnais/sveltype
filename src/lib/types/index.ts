export interface IWord {
  word: string;
  characters: IChar[];
  id: number;
}

export interface IChar {
  char: string;
  id: number;
}

export interface WpmMetrics {
  raw: number;
  net: number;
}

// undefined if not touched, true if correct, false if incorrect
export type LetterStatus = undefined | true | false;

export interface Duration {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export enum GameState {
  WAITING,
  STARTED,
  ENDED
}

export type GameMode = 'TIME' | 'WORDS';

export interface Game {
  words: IWord[];
  currentWord: IWord | null;
  characters: string[];
  allCharacters: string[];
  errors: {
    total: number;
    uncorrected: number;
  };
  state: GameState;
  time: {
    start: number;
    end: number;
  };
}
