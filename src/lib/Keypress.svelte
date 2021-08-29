<script lang="ts">
  import { text } from 'svelte/internal';

  // https://svelte.dev/tutorial/svelte-window
  // https://svelte.dev/tutorial/updating-arrays-and-objects
  let key: string;
  export let currentChars: string[] = [];
  export let typedChars: string[] = [];
  export let gameRunning: boolean;
  export let start: () => void;
  export let reset: () => void;

  function handleKeypress(event: { key: string }) {
    key = event.key;
    const regex = /^[\w\W]$/gm; // true if any single char - no words or modifiers
    const isChar = regex.test(key);

    if (!gameRunning && isChar) {
      // if the game is not running, start the game if character is typed
      gameRunning = true;
      start();
    } else if (gameRunning && key === 'Escape') {
      // if the game is running and escape key is pressed, reset the game
      currentChars = [];
      reset();
    }

    if (key === 'Backspace') {
      currentChars.pop();
    } else {
      isChar && currentChars.push(key);
    }
    currentChars = currentChars;

    // push all typed characters to calc the accuracy
    isChar && typedChars.push(key);
    typedChars = typedChars;
  }
</script>

<svelte:window on:keydown={handleKeypress} />
