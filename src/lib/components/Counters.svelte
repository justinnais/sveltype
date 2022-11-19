<script lang="ts">
  import { game, time } from '$lib/stores';
  import { GameState, type IWord, type WpmMetrics } from '$lib/types';

  export let currentWord: IWord | undefined;
  export let words: IWord[];
  export let wpm: WpmMetrics;
  export let accuracy: number;
  // TODO bug here with char array going to zero - eg type then backspace to zero
</script>

<div class="text-lg font-medium flex flex-row justify-start gap-8 mb-4">
  {#if $game.state === GameState.WAITING}
    <h4>type to start</h4>
  {:else}
    <span>{Math.trunc(wpm.net)} wpm</span>
    <span>{accuracy}% acc</span>
    {#if $game.mode === 'WORDS'}
      <span>{currentWord?.id ?? words.length}/{words.length}</span>
      <span>{$time.elapsed} seconds</span>
      {:else}
      <span>{$time.remaining} seconds</span>
    {/if}
  {/if}
</div>
