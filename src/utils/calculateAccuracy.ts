import type { IWord } from 'src/types/types';
import { wordsToChars } from './wordsToChars';

export function calculateAccuracy(
  currentChars: string[],
  typedChars: string[],
  words: IWord[]
): number {
  // correct array of characters truncated to length of currentChars
  const correctChars = words
    .map((word) => word.characters)
    .flat()
    .map((char) => char.char)
    .slice(0, currentChars.length);

  let errorCount = 0;
  let adjustmentCount = 0;

  // loop through array of correct characters
  for (let index = 0; index < correctChars.length; index++) {
    const typed = typedChars[index + adjustmentCount];
    const correct = correctChars[index];
    // console.log(index, typed, correct);

    if (typed !== correct) {
      // if the typed character at that index is not the same, increase error count
      // if it is a backspace, increase adjustment amount by 2
      // console.log('error', typed);

      if (typed === 'Backspace') {
        // console.log('IS BACKSPACE', typed)
        adjustmentCount += 2;
      } else {
        errorCount += 1;
      }

      // adjust by two to account for backspace and the character being deleted

      if (
        typed === 'Backspace' &&
        typedChars[index + adjustmentCount - 1] === 'Backspace'
      ) {
        // if the previously typed char is another backspace, only adjust by 1;
        adjustmentCount -= 1;
      }
    }
  }

  // console.log('error count', errorCount);

  // let correct = 0;
  // let errors = 0;
  // correctChars.slice(0, currentChars.length).map((character, index) => {
  //   // map through array of correct characters, while
  //   if (character !== currentChars[index]) {
  //     console.log(
  //       'error',
  //       character, // correct character
  //       index,
  //       errors
  //     );
  //     errors += 1;
  //   }
  //   correct += 1;
  // });

  // console.log(correct, errors);

  const count = currentChars.length;
  const accuracy = parseInt((100 - (errorCount / count) * 100).toFixed(0));
  if (accuracy < 0) {
    return 0;
  }

  return accuracy;
}
