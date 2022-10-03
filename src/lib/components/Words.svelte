<script lang="ts">
  import { fly } from 'svelte/transition';
  import Letter from '$lib/components/Letter.svelte';
  import type { IWord } from '$lib/types';

  export let words: IWord[];
  export let characters: string[];
  let space = '&nbsp;';
</script>

<!-- this div is needed to workaround Svelte bug https://github.com/sveltejs/svelte/issues/544 -->
<div class="transition-force">
  <!-- this is a hacky key to prevent transition spam due to using array as key, plan to replace this with some kind of uuid that gets generated on word creation -->
  {#key words.map(({ word }) => word).join('')}
    <div
      class="words-container"
      in:fly={{ y: 20, duration: 500 }}
      out:fly={{ y: -20, duration: 250 }}
    >
      <div class="words">
        {#each words as word}
          <span id={`word-${word.id}`} class="word leading-6">
            {#each word.characters as char}
              <Letter id={char.id} {characters} {words}
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
  .transition-force {
    display: grid;
  }
  .transition-force > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }
</style>
