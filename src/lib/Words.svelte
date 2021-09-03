<script lang="ts">
  import Letter from '../lib/Letter.svelte';
  import type { IWord } from '../types/types';

  export let words: IWord[];
  export let currentChars;
  let space = '&nbsp;';
</script>

<div class="words-container">
  <div class="words">
    {#each words as word}
      <span id={`word-${word.id}`} class="word">
        {#each word.characters as char}
          <Letter id={char.id} {currentChars} {words}
            >{@html char.char === ' ' ? space : char.char}</Letter
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
