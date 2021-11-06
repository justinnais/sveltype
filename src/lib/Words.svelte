<script lang="ts">
  import { onMount } from 'svelte';

  import { fly, fade } from 'svelte/transition';
  import Letter from '../lib/Letter.svelte';
  import type { IWord } from '../types/types';

  export let words: IWord[];
  export let currentChars;
  let space = '&nbsp;';

  let containerWidth;

  let lines = 0;

  onMount(() => {
    /* Calculate the width of each word in order to work out which line it is on */
    words.forEach((word) => {
      const element = document.getElementById(`word-${word.id}`);
      const width = element.getBoundingClientRect().width; 
      words[word.id].clientWidth = width;
    });
  });
</script>

<!-- this div is needed to workaround Svelte bug https://github.com/sveltejs/svelte/issues/544 -->
<div class="transition-force">
  {#key words}
    <div
      bind:clientWidth={containerWidth}
      id="words-container"
      in:fly={{ y: 20, duration: 500 }}
      out:fly={{ y: -20, duration: 250 }}
    >
      <span>{containerWidth}</span>
      <div class="words">
        {#each words as word (word.id)}
          <span id={`word-${word.id}`} class="word">
            {#each word.characters as char (char.id)}
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
