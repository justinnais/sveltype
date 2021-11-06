<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from 'svelte';

  import { fly, fade } from 'svelte/transition';
  import Letter from '../lib/Letter.svelte';
  import type { IWord } from '../types/types';

  export let words: IWord[];
  export let currentChars;
  let space = '&nbsp;';

  let containerWidth;

  let lines = 0;
  let totalWidth = 0;

  function calculateWordWidth(id: number) {
    const element = document.getElementById(`word-${id}`);
    const width = element.getBoundingClientRect().width;

    return width;
  }

  function calculateLineNumber(id: number) {
    // set the line value to be the previous words line value
    words[id].line = id === 0 ? 0 : words[id - 1].line;

    // if the word breaks the line, increase line value
    if (totalWidth + words[id].clientWidth > containerWidth) {
      words[id].line += 1;
    }
  }

  function addWordProperties() {
    /* Calculate the width of each word in order to work out which line it is on */
    words.forEach((word) => {
      const width = calculateWordWidth(word.id);
      words[word.id].clientWidth = width;
      calculateLineNumber(word.id);

      if (totalWidth + width > containerWidth) {
        totalWidth = 0;
      } else {
        totalWidth += width;
      }
    });
    console.log('words', words);

    console.log('total', totalWidth);
  }

  onMount(() => {
    addWordProperties();
  });

  // need to update line numbers when client width changes, but this causes animations to retrigger for each pixel change
  // afterUpdate(() => {
  //   addWordProperties();
  // });
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
      <div class="words">
        {#each words as word (word.id)}
          <span id={`word-${word.id}`} class="word" class:line-0={word.line === 0} class:line-1={word.line === 1} class:line-2={word.line === 2}>
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

  .line-0 {
    background-color: green;
  }
  .line-1 {
    background-color: blue;
  }
  .line-2 {
    background-color: red;
  }
</style>
