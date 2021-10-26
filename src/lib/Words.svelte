<script lang="ts">
  import { fly } from 'svelte/transition';
  import Letter from '../lib/Letter.svelte';
  import type { IWord } from '../types/types';

  export let words: IWord[];
  export let currentChars;
  let space = '&nbsp;';
</script>

{#key words}
<div class="words-container" in:fly={{y:20, duration:1000}}>
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
{/key}


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
