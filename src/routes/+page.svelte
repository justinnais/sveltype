<script lang="ts">
  import 'carbon-components-svelte/css/g100.css';
  import { fly, fade } from 'svelte/transition';

  import Header from '$lib/components/Header.svelte';
  import Words from '$lib/components/Words.svelte';
  import Keypress from '$lib/components/Keypress.svelte';
  import Restart from '$lib/components/Restart.svelte';
  import Results from '$lib/components/Results.svelte';
  import Counters from '$lib/components/Counters.svelte';

  import { generateWords } from '$lib/utils/generate';
  import { wordsToChars } from '$lib/utils/wordsToChars';
  import { calculateAccuracy } from '$lib/utils/calculateAccuracy';
  import { getCurrentTime } from '$lib/utils/timeLogic';
  import { calculateWPM } from '$lib/utils/calculateWPM';
  import { getCurrentWord } from '$lib/utils/getCurrentWord';

  /* WORDS */
  $: words = generateWords(metricValue); // list of generated words
  $: currentWord = getCurrentWord(words, currentChars);

  /* CHARS */
  let currentChars: string[] = []; // array of corrected characters, used to get caret position
  let typedChars: string[] = []; // typed chars is all characters typed including errors

  /* GAME STATE */
  $: gameRunning = false;
  let gameCompleted = false;
  type gameOptions = 'Time' | 'Words';
  let gameMetric: gameOptions = 'Words';
  let metricValue = 15;

  $: if (currentChars.length === wordsToChars(words).length) {
    endGame();
  }

  function startGame() {
    gameRunning = true;
    startTime = getCurrentTime();
    timerCycle();
  }

  function endGame() {
    endTime = getCurrentTime();
    stopTimer();
    gameRunning = false;
    gameCompleted = true;
  }

  function resetGame() {
    // TODO fix words, accuracy and errors not resetings correctly
    gameRunning = false;
    gameCompleted = false;
    words = generateWords(metricValue);
    currentChars = [];
    typedChars = [];
    errors = 0;
    startTime = 0;
    elapsedSeconds = 0;
    stopTimer();
  }

  $: if (metricValue) {
    // if we update word count, restart
    resetGame();
  }

  /* TIME */
  let startTime = 0;
  let endTime = 0;
  $: duration = endTime - startTime;
  let elapsedSeconds = 0;

  let handleTimeout: any; // TODO replace

  function timerCycle() {
    handleTimeout = setTimeout(incrementTime, 1000);
  }

  function stopTimer() {
    clearTimeout(handleTimeout);
  }

  function incrementTime() {
    elapsedSeconds += 1;
    timerCycle();
  }

  /* WPM */
  let wpm = 0;
  $: if (currentChars[currentChars.length - 1] === ' ') {
    // calcs wpm on spacebar
    wpm = calculateWPM(words, currentChars, startTime);
  }

  /* ACCURACY */
  let accuracy = 0;
  let errors = 0;
  $: accuracy = calculateAccuracy(currentChars, errors);
</script>

<div class="app">
  <div class="content">
    <Header bind:metricValue bind:gameMetric reset={resetGame} />
    <main>
      <div class="transition-force">
        {#if !gameCompleted}
          <div out:fly={{ y: -20, duration: 250 }} in:fade={{ duration: 500 }}>
            <!-- these extra divs are needed to wrap transition-force children in to fix animation issue -->
            <Counters {gameRunning} {currentWord} {words} {wpm} {accuracy} {elapsedSeconds} />
            <!-- <Timer {startTime} {gameRunning} /> -->
            <Keypress
              bind:currentChars
              bind:typedChars
              bind:gameRunning
              start={startGame}
              reset={resetGame}
              {words}
              bind:errors
            />
            <Words {words} {currentChars} />
          </div>
        {:else}
          <div>
            <Results words={words.length} {currentChars} {wpm} {accuracy} {errors} {duration} />
          </div>
        {/if}
      </div>
      <Restart reset={resetGame} />
    </main>
  </div>
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .app {
    display: flex;
    justify-content: space-around;
  }

  .content {
    /* min-width: 400px; */
    width: -webkit-fill-available;
    max-width: 1000px;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    padding: 2rem;
    align-items: center;
    gap: 2rem;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
  }

  .transition-force {
    display: grid;
  }
  .transition-force > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }
</style>
