<script lang="ts">
  import { GameState, type IWord, type wpmMetrics } from '$lib/types';
  import { game } from '$lib/stores';
  import { calculateWPM } from '$lib/utils';

  let key: string;
  export let words: IWord[];
  export let wpm: wpmMetrics;

  $: isRunning = $game.state === GameState.STARTED;

  // flatten words into character array
  $: correctChars = words
    .map((word) => word.characters)
    .flat()
    .map((char) => char.char);

  function handleKeypress(event: KeyboardEvent) {
    key = event.key;
    const regex = /^[\w\W]$/gm; // true if any single char - no words or modifiers
    const isChar = regex.test(key);

    if (!isRunning && isChar) {
      // if the game is not running, start the game if character is typed
      game.start();
    } else if (isRunning && key === 'Escape') {
      // if the game is running and escape key is pressed, reset the game
      $game.characters = [];
      game.reset();
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
    $game.characters = $game.characters;
    // push all typed characters to calc the accuracy
    $game.allCharacters = $game.allCharacters;
    wpm = calculateWPM($game.allCharacters, $game.errors.uncorrected, $game.time.start);
  }

  function handleTab(event: KeyboardEvent) {
    // I could use the button ref but that would require some prop drilling I want to avoid
    event.preventDefault();
    const restartButton = document.getElementById('restart-button');
    const isFocused = document.activeElement === restartButton;
    isFocused ? restartButton.blur() : restartButton.focus();
  }

  function handleBackspace(key: string) {
    $game.characters.pop();
    $game.allCharacters.push(key);
  }

  function handleChar(key: string, isChar: boolean) {
    if (isChar) {
      $game.characters.push(key);
      $game.allCharacters.push(key);

      checkIfError(key, correctChars[$game.characters.length - 1]);
    }
  }

  function checkIfError(typed: string, correct: string) {
    if (typed !== correct) {
      $game.errors.total += 1;
      // $game.errors.uncorrected += 1;
      // TODO need to check if the error is corrected and adjust uncorrectedErrors
    }
  }
</script>

<svelte:window on:keydown={handleKeypress} />
