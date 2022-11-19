<script lang="ts">
  import { game } from '$lib/stores';
  import type { WpmMetrics } from '$lib/types';
  import { fly } from 'svelte/transition';

  export let words: number;
  export let characters: string[];
  export let wpm: WpmMetrics;
  export let accuracy: number;
  const duration = $game.time.end - $game.time.start;
  let seconds = (duration / 1000).toFixed(2);
</script>

<div class="transition-force">
  <div
    class="result-container"
    in:fly={{ y: 20, duration: 500 }}
    out:fly={{ y: -20, duration: 250 }}
  >
    <div class="big-stats">
      <h2>{wpm.net} wpm</h2>
      <h2>{accuracy}% accuracy</h2>
    </div>

    <div class="small-stats">
      <h4>{wpm.raw} raw</h4>
      <h4>{seconds} seconds</h4>
      <h4>{words} words</h4>
      <h4>{characters.length} characters</h4>
      <h4>{$game.errors.total} error{$game.errors.total === 1 ? '' : 's'}</h4>
    </div>
  </div>
</div>

<style>
  .result-container {
    min-height: 10rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    margin-top: 2.5rem; /* margin to account for counter */
    /* justify-content: left; */
    /* gap: 2rem; */
  }

  .small-stats {
    display: flex;
    justify-content: left;
    gap: 2em;
  }

  .big-stats {
    display: flex;
    gap: 2em;
  }

  h2 {
    font-size: 3rem;
  }
</style>
