<script lang="ts">
  import { fly, fade, crossfade } from 'svelte/transition';
  import { wordsToChars } from '../utils/wordsToChars';
  import Caret from './Caret.svelte';

  export let id;
  export let currentChars;
  export let words;

  $: touched = currentChars.length > id;
  $: isCorrect = wordsToChars(words)[id].char === currentChars[id];
  $: showCaret = currentChars.length === id;

  // caret animation
  const duration = 200;
  const x = 15; // width of letter element
  const opacity = 0;

  // TODO calculate the duration based on users WPM
  // TODO adjusted x direction if backspace
</script>

{#if showCaret}
  <div out:fly={{ x, duration, opacity }} in:fly={{ x: -x, duration, opacity }}>
    <Caret />
  </div>
{/if}
<span
  id={`char-${id}`}
  class="letter"
  class:incorrect={touched && !isCorrect}
  class:correct={touched && isCorrect}
>
  <slot />
</span>

<style>
  .letter {
    /* padding left size of caret width */
    padding: 0 1px;
    display: inline-flex;
    color: grey;
  }
  .correct {
    color: white;
  }
  .incorrect {
    background-color: rgb(160, 67, 67);
  }
</style>
