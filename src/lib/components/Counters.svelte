<script lang="ts">
  import type { IWord } from '$lib/types/types';

  export let gameRunning: boolean;
  export let currentWord: IWord;
  export let words: IWord[];
  export let wpm: number;
  export let accuracy: number;
  export let elapsedSeconds: number;
</script>

<div class="text-lg flex flex-row justify-start gap-8 mb-4">
  {#if !gameRunning}
    <h4>Type to start</h4>
  {:else}
    <!-- TODO bug here with array going to zero - eg type then backspace to zero -->
    <h4>{currentWord.id}/{words.length}</h4>
    <h4>{wpm} wpm</h4>
    <h4>{accuracy}% acc</h4>
    <h4>{elapsedSeconds} seconds</h4>
  {/if}
</div>
