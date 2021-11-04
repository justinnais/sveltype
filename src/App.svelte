<script lang="ts">
  import 'carbon-components-svelte/css/g100.css';
  import { fly, fade } from 'svelte/transition';

  import Header from './lib/Header.svelte';
  import Words from './lib/Words.svelte';
  import Keypress from './lib/Keypress.svelte';
  import Restart from './lib/Restart.svelte';
  import Results from './lib/Results.svelte';
  import Counters from './lib/Counters.svelte';

  import { generateWords } from './utils/generate';
  import { wordsToChars } from './utils/wordsToChars';
  import { calculateAccuracy } from './utils/calculateAccuracy';
  import { getCurrentTime } from './utils/timeLogic';
  import { calculateWPM } from './utils/calculateWPM';
  import { getCurrentWord } from './utils/getCurrentWord';
  import Timer from './lib/Timer.svelte';

  /* WORDS */
  // TODO handle infite words for timed games
  $: words = generateWords(defaultWordCount); // list of generated words
  $: currentWord = getCurrentWord(words, currentChars);
  $: defaultWordCount = gameMetric === 'Words' ? metricValue : 60;

  /* CHARS */
  let currentChars: string[] = []; // array of corrected characters, used to get caret position
  let typedChars: string[] = []; // typed chars is all characters typed including errors

  /* GAME STATE */
  /* Default state */
  $: gameRunning = false;
  let gameCompleted = false;
  type gameOptions = 'Time' | 'Words';
  let gameMetric: gameOptions = 'Words';
  let metricValue: number = 15;

  /* If the user reaches end of the sentence, or runs out of time - end the game */
  $: if (
    currentChars.length === wordsToChars(words).length ||
    (gameMetric === 'Time' && secondsRemaining <= 0)
  ) {
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
    words = generateWords(defaultWordCount);
    currentChars = [];
    typedChars = [];
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
  let testLength = metricValue;
  $: duration = endTime - startTime;
  $: elapsedSeconds = 0;
  $: secondsRemaining = testLength - elapsedSeconds;

  let handleTimeout: NodeJS.Timeout;

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

  /* PROPS OBJECTS */
  $: counterProps = {
    gameMetric,
    gameRunning,
    currentWord,
    words,
    wpm,
    accuracy,
    elapsedSeconds,
    secondsRemaining,
  };

  $: resultsProps = {
    words: words.length,
    currentChars,
    wpm,
    accuracy,
    errors,
    duration,
  };
</script>

<div class="app">
  <div class="content">
    <Header bind:metricValue bind:gameMetric reset={resetGame} />
    <main>
      <div class="transition-force">
        {#if !gameCompleted}
          <div out:fly={{ y: -20, duration: 250 }} in:fade={{ duration: 500 }}>
            <!-- these extra divs are needed to wrap transition-force children in to fix animation issue -->
            <Counters {...counterProps} />
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
            <Results {...resultsProps} />
          </div>
        {/if}
      </div>
      <Restart reset={resetGame} />
    </main>
  </div>
</div>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
