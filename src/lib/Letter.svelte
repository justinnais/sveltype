<script lang="ts">
  import { wordsToChars } from '../wordsToChars';
  import Caret from './Caret.svelte';

  export let id;
  export let keyArray;
  export let words;

  $: touched = keyArray.length > id;
  $: isCorrect = wordsToChars(words)[id].char === keyArray[id];
  $: showCaret = keyArray.length === id;
</script>

<span
  id={`char-${id}`}
  class="letter"
  class:showCaret
  class:incorrect={touched && !isCorrect}
  class:correct={touched && isCorrect}
>
  {#if showCaret}
    <Caret />
  {/if}
  <slot />
</span>

<style>
  .letter {
    /* padding left size of caret width */
    padding: 0 2px;
    display: inline-flex;
    color: grey;
  }
  .showCaret {
    /* if showing the caret, get rid of padding so letters do not shift around  */
    padding-left: 0;
  }
  .correct {
    color: white;
  }
  .incorrect {
    background-color: rgb(160, 67, 67);
  }
</style>
