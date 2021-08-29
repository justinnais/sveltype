<script lang="ts">
  import Caret from './Caret.svelte';
  export let id;
  export let keyArray;
  export let chars;

  $: touched = keyArray.length > id;
  $: isCorrect = chars[id] === keyArray[id];
  $: showCaret = keyArray.length === id;
</script>

<span
  class="span"
  class:showingCaret={showCaret}
  class:incorrect={!isCorrect && touched}
>
  {#if showCaret}
    <Caret />
  {/if}
  <span id={`char-${id}`} class="char" class:correct={isCorrect && touched}>
    <slot />
  </span>
</span>

<style>
  .span {
    /* padding left size of caret width */
    padding: 0 2px;
    display: inline-flex;
  }
  .showingCaret {
    /* if showing the caret, get rid of padding so letters do not shift around  */
    padding-left: 0;
  }
  .char {
    color: grey;
    /* margin: 0.1rem; */
  }
  .correct {
    color: white;
  }
  .incorrect {
    background-color: rgb(160, 67, 67);
  }
</style>
