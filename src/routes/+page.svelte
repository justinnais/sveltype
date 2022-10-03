<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { game } from '$lib/stores';
  import { Words, Keypress, Restart, Results, Counters, Header } from '$lib/components';
  import { wordsToChars, calculateAccuracy, getCurrentWord } from '$lib/utils';
  import { GameState, type wpmMetrics } from '$lib/types';

  $: currentWord = getCurrentWord($game.words, $game.characters);

  /* GAME STATE */
  type gameOptions = 'Time' | 'Words';
  let gameMetric: gameOptions = 'Words';
  let metricValue = 15;

  // this isn't a robust way to handle game ending
  $: if ($game.characters.length === wordsToChars($game.words).length) {
    game.end();
  }

  let wpm: wpmMetrics = { raw: 0, net: 0 };
  let accuracy = 0;
  $: accuracy = calculateAccuracy($game.characters, $game.errors.total);
</script>

<Header bind:metricValue bind:gameMetric />
<main class="flex flex-col justify-between gap-4">
  <div class="transition-force">
    {#if $game.state === GameState.ENDED}
      <div>
        <Results words={$game.words.length} characters={$game.characters} {wpm} {accuracy} />
      </div>
    {:else}
      <div out:fly={{ y: -20, duration: 250 }} in:fade={{ duration: 500 }}>
        <Counters {currentWord} words={$game.words} {wpm} {accuracy} />
        <Keypress words={$game.words} bind:wpm />
        <Words words={$game.words} characters={$game.characters} />
      </div>
    {/if}
  </div>
  <Restart reset={game.reset} />
</main>

<style>
  .transition-force {
    display: grid;
  }
  .transition-force > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }
</style>
