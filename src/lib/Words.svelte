<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import Letter from '../lib/Letter.svelte';
  import type { IWord } from '../types/types';

  export let words: IWord[];
  export let currentChars;
  let space = '&nbsp;';

  // console.log('foo', container.offsetWidth)
</script>

<!-- this div is needed to workaround Svelte bug https://github.com/sveltejs/svelte/issues/544 -->
<div class="transition-force">
  {#key words}
    <div
      id="words-container"
      in:fly={{ y: 20, duration: 500 }}
      out:fly={{ y: -20, duration: 250 }}
    >
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
</div>

<style>
  #words-container {
    height: calc((1.5rem + 0.4rem) * 3); /* 3 lines worth + bottom margins */
    overflow: hidden;

    /* once caret reaches 3rd line - transform container up 1 line 
    how do I track the lines in a flex box?
    transform: translateY(calc(-(1.5rem + 0.4rem))) */

    /* TODO - find the width of words container, calculate the width of each word, find which word breaks the wrap */
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
  .transition-force {
    display: grid;
  }
  .transition-force > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }
</style>
