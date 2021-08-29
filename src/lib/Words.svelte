<script lang="ts">
  import Letter from '../lib/Letter.svelte';
  import type { IWord } from '../types/types';

  export let words: IWord[];
  export let keyArray;
  export let chars;

  let letterId = -1;
  let space = '&nbsp;';

  function getCharId() {
    return (letterId += 1);
  }
</script>

<div class="words-container">
  <div class="words">
    {#each words as word, key}
      <span id={`word-${key}`} class="word">
        {#each word.characters as char, key}
          <Letter id={getCharId()} {keyArray} {chars}
            >{@html char === ' ' ? space : char}</Letter
          >
        {/each}
      </span>
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
  .word {
    display: flex;
    margin-bottom: 0.4rem;
  }
</style>
