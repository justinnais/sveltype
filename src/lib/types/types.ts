export interface IWord {
  word: string;
  characters: IChar[];
  id: number;
}

export interface IChar {
  char: string;
  id: number;
}

// undefined if not touched, true if correct, false if incorrect
export type LetterStatus = undefined | true | false;
