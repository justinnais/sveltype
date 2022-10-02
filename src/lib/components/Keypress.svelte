<script lang="ts">
  import type { IWord } from '$lib/types';
  import { game } from '$lib/stores'

  // https://svelte.dev/tutorial/svelte-window
  // https://svelte.dev/tutorial/updating-arrays-and-objects
  let key: string;
  export let currentChars: string[] = [];
  export let typedChars: string[] = [];
  export let gameRunning: boolean;
  // export let errors: number;
  export let words: IWord[];
  export let start: () => void;
  export let reset: () => void;

  // flatten words into character array
  $: correctChars = words
    .map((word) => word.characters)
    .flat()
    .map((char) => char.char);

  function handleKeypress(event: { key: string; preventDefault: () => void }) {
    key = event.key;
    const regex = /^[\w\W]$/gm; // true if any single char - no words or modifiers
    const isChar = regex.test(key);

    if (!gameRunning && isChar) {
      // if the game is not running, start the game if character is typed
      start();
    } else if (gameRunning && key === 'Escape') {
      // if the game is running and escape key is pressed, reset the game
      currentChars = [];
      reset();
    }

    switch (key) {
      case 'Tab':
        handleTab(event);
        break;
      case 'Backspace':
        handleBackspace(key);
        break;
      default:
        handleChar(key, isChar);
        break;
    }
    currentChars = currentChars;
    // push all typed characters to calc the accuracy
    typedChars = typedChars;
  }

  function handleTab(event: KeyboardEvent) {
    // I could use the button ref but that would require some prop drilling I want to avoid
    event.preventDefault();
    const restartButton = document.getElementById('restart-button');
    const isFocused = document.activeElement === restartButton;
    isFocused ? restartButton.blur() : restartButton.focus();
  }

  function handleBackspace(key: string) {
    currentChars.pop();
    typedChars.push(key);
  }

  function handleChar(key: string, isChar: boolean) {
    if (isChar) {
      currentChars.push(key);
      typedChars.push(key);

      checkIfError(key, correctChars[currentChars.length - 1]);
    }
  }

  function checkIfError(typed: string, correct: string) {
    if (typed !== correct) {
      $game.errors.total += 1;
      $game.errors.uncorrected += 1;
      // TODO need to check if the error is corrected and adjust uncorrectedErrors
    }
  }
</script>

<svelte:window on:keydown={handleKeypress} />
