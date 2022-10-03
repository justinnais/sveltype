<script lang="ts">
  import { fly } from 'svelte/transition';
  import Letter from '$lib/components/Letter.svelte';
  import type { IWord } from '$lib/types';

  export let words: IWord[];
  export let characters: string[];
  export let currentWord: IWord | undefined;
  let space = '&nbsp;';

  $: element = currentWord ? document.getElementById('word-' + currentWord.id) : null;
  $: element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
</script>

<!-- this div is needed to workaround Svelte bug https://github.com/sveltejs/svelte/issues/544 -->
<div class="transition-force">
  <!-- this is a hacky key to prevent transition spam due to using array as key, plan to replace this with some kind of uuid that gets generated on word creation -->
  {#key words.map(({ word }) => word).join('')}
    <div
      class="min-h-[10rem]"
      in:fly={{ y: 20, duration: 500 }}
      out:fly={{ y: -20, duration: 250 }}
    >
      <div class="words">
        {#each words as word}
          <span id={`word-${word.id}`} class="mb-2">
            {#each word.characters as char}
              <Letter id={char.id} {characters} {words}>
                {@html char.char === ' ' ? space : char.char}
              </Letter>
            {/each}
          </span>
        {/each}
      </div>
    </div>
  {/key}
</div>

<style lang="postcss">
  .words {
    @apply font-mono text-2xl leading-6 w-full flex flex-wrap overflow-hidden select-none p-px;
    max-height: calc(3 * (theme(spacing.6) + theme(spacing.2)));
  }
  .transition-force {
    display: grid;
  }
  .transition-force > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }
</style>
