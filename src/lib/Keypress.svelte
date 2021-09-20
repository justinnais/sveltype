<script lang="ts">
  // https://svelte.dev/tutorial/svelte-window
  // https://svelte.dev/tutorial/updating-arrays-and-objects
  let key: string;
  export let currentChars: string[] = [];
  export let typedChars: string[] = [];
  export let gameRunning: boolean;
  export let start: () => void;
  export let reset: () => void;

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

  function handleTab(event: { key?: string; preventDefault: any }) {
    // I could use the button ref but that would require some prop drilling I want to avoid
    event.preventDefault();
    document.getElementById('restart-button').focus();
  }

  function handleBackspace(key: string) {
    currentChars.pop();
    typedChars.push(key);
  }

  function handleChar(key: string, isChar: boolean) {
    if (isChar) {
      currentChars.push(key);
      typedChars.push(key);
    }
  }
</script>

<svelte:window on:keydown={handleKeypress} />
