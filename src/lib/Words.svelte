<script lang="ts">
  import Word from '../lib/Word.svelte';
  import type { IWord } from '../types/types';
  // array of Word objects
  export let words: IWord[];
  
</script>

<div class="words-container">
  <!-- add a caret -->
  <div class="words">
    {#each words as word, key}
      <Word {word} {key}/>
    {/each}
  </div>
</div>

<style>
  .words-container {
    min-height: 10rem;
    overflow: hidden;
  }
  .words {
    font-family: monospace;
    font-size: 1.5rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
</style>
