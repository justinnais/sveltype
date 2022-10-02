<script lang="ts">
  import { elapsed, game } from '$lib/stores';
  import { GameState, type IWord, type wpmMetrics } from '$lib/types';

  export let currentWord: IWord;
  export let words: IWord[];
  export let wpm: wpmMetrics;
  export let accuracy: number;
  // TODO bug here with char array going to zero - eg type then backspace to zero
</script>

<div class="text-lg font-medium flex flex-row justify-start gap-8 mb-4">
  {#if $game.state === GameState.WAITING}
    <h4>type to start</h4>
  {:else}
    <h4>{currentWord.id}/{words.length}</h4>
    <h4>{Math.trunc(wpm.net)} wpm</h4>
    <h4>{accuracy}% acc</h4>
    <h4>{$elapsed} seconds</h4>
  {/if}
</div>
