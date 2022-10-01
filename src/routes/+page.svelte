<script lang="ts">
  import { fly, fade } from 'svelte/transition';

  import { Words, Keypress, Restart, Results, Counters, Header } from '$lib/components';
  import {
    generateWords,
    wordsToChars,
    calculateAccuracy,
    calculateWPM,
    getCurrentWord
  } from '$lib/utils';
  import type { IWord } from '$lib/types/types';

  export let data: { words: IWord[] };

  /* WORDS */
  $: words = data.words; // list of generated words
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
    startTime = Date.now()
    timerCycle();
  }

  function endGame() {
    endTime = Date.now()
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

<Header bind:metricValue bind:gameMetric reset={resetGame} />
<main class="flex flex-col justify-between gap-4">
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

<style>
  .transition-force {
    display: grid;
  }
  .transition-force > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }
</style>
