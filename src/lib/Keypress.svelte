<script lang="ts">
  import { text } from 'svelte/internal';

  // https://svelte.dev/tutorial/svelte-window
  // https://svelte.dev/tutorial/updating-arrays-and-objects
  let key: string;
  export let keyArray: string[] = [];

  function handleKeypress(event: { key: string }) {
    key = event.key;
    let regex = /^[\w\W]$/gm; // true if any single char - no words or modifiers
    if (key === 'Backspace') {
      keyArray.pop();
    } else {
      const isChar = regex.test(key);
      isChar && keyArray.push(key);
    }
    keyArray = keyArray;
  }
</script>

<svelte:window on:keydown={handleKeypress} />
