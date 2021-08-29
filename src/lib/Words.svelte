<script lang="ts">
  import Word from '../lib/Word.svelte';
  import Letter from '../lib/Letter.svelte';
  import type { IWord } from '../types/types';
  // array of Word objects
  export let words: IWord[];
  let letterId = 0;
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
          <Letter id={getCharId()}>{@html char === ' ' ? space : char}</Letter>
          <!-- <letter class="char" id={`char-${getCharId()}`}
            >{@html char === ' ' ? space : char}</letter
          > -->
        {/each}
      </span>
    {/each}
  </div>
</div>

<!-- <div class="words-container">
  <div class="words">
    {#each words as word, key}
      <Word {word} {key}/>
    {/each}
  </div>
</div> -->
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
    margin-bottom: 0.4rem;
  }
</style>
