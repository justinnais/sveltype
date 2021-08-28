export interface IWord {
  word: string;
  characters: string[];
  // characters: IChar[];
}

export interface IChar {
  char: string;
  status: LetterStatus;
}

// undefined if not touched, true if correct, false if incorrect
export type LetterStatus = undefined | true | false;
