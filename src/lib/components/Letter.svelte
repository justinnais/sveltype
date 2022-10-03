<script lang="ts">
  import { fly } from 'svelte/transition';
  import { wordsToChars } from '$lib/utils';
  import Caret from './Caret.svelte';

  export let id;
  export let characters;
  export let words;

  $: touched = characters.length > id;
  $: isCorrect = wordsToChars(words)[id].char === characters[id];
  $: showCaret = characters.length === id;

  // caret animation
  const duration = 200;
  const x = 15; // width of letter element

  // TODO calculate the duration based on users WPM
  // TODO adjusted x direction if backspace
</script>

{#if showCaret}
  <div out:fly={{ x, duration }} in:fly={{ x: -x, duration }}>
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
    /* color: grey; */
    opacity: 50%;
  }
  .correct {
    /* color: white; */
    opacity: 100%;
  }
  .incorrect {
    background-color: rgb(160, 67, 67);
  }
</style>
