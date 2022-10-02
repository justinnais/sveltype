<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { game } from '$lib/stores';
  import { Words, Keypress, Restart, Results, Counters, Header } from '$lib/components';
  import { wordsToChars, calculateAccuracy, calculateWPM, getCurrentWord } from '$lib/utils';
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

  // TODO re-implement time code 
  /* TIME */
  // let elapsedSeconds = 0;

  // // eslint-disable-next-line
  // let handleTimeout: any; // TODO replace

  // function timerCycle() {
  //   handleTimeout = setTimeout(incrementTime, 1000);
  // }

  // function stopTimer() {
  //   clearTimeout(handleTimeout);
  // }

  // function incrementTime() {
  //   elapsedSeconds += 1;
  //   timerCycle();
  // }

  /* WPM */
  let wpm: wpmMetrics = { raw: 0, net: 0 };
  $: if ($game.characters[$game.characters.length - 1] === ' ') {
    // calcs wpm on spacebar
    // can't properly destructure in here
    // TODO allCharacters currently includes backspace, which it shouldn't
    wpm = calculateWPM($game.allCharacters, $game.errors.uncorrected, $game.time.start);
  }

  /* ACCURACY */
  let accuracy = 0;
  $: accuracy = calculateAccuracy($game.characters, $game.errors.total);
</script>

<Header bind:metricValue bind:gameMetric />
<pre>
  {JSON.stringify($game.characters.join(''), null, 2)}
  {JSON.stringify($game.errors, null, 2)}

</pre>
<main class="flex flex-col justify-between gap-4">
  <div class="transition-force">
    {#if $game.state === GameState.ENDED}
      <div>
        <Results words={$game.words.length} characters={$game.characters} {wpm} {accuracy} />
      </div>
    {:else}
      <div out:fly={{ y: -20, duration: 250 }} in:fade={{ duration: 500 }}>
        <Counters {currentWord} words={$game.words} {wpm} {accuracy} />
        <!-- <Timer {startTime} {gameRunning} /> -->
        <Keypress reset={game.reset} words={$game.words} />
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
