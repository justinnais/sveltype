<script lang="ts">
  import Counter from './lib/Counter.svelte';
  import Header from './lib/Header.svelte';
  import 'carbon-components-svelte/css/g100.css';
  import Words from './lib/Words.svelte';
  import Keypress from './lib/Keypress.svelte';
  import WordCountRadio from './lib/WordCountRadio.svelte';
  import { generateWords } from './utils/generate';
  import { wordsToChars } from './utils/wordsToChars';
  import { Button } from 'carbon-components-svelte';
  import { calculateAccuracy } from './utils/calculateAccuracy';
  import Timer from './lib/Timer.svelte';
  import Accuracy from './lib/Accuracy.svelte';
  import Restart from './lib/Restart.svelte';
  import { currentTime } from './utils/timeLogic';
  import { calculateWPM } from './utils/calculateWPM';
  import { getCurrentWord } from './utils/getCurrentWord';

  /* WORDS */
  let selectedWordCount: string = '25'; // defualt word count
  $: wordCount = parseInt(selectedWordCount);
  $: words = generateWords(wordCount); // list of generated words
  $: currentWord = getCurrentWord(words, currentChars);

  /* CHARS */
  let currentChars: string[] = []; // array of corrected characters, used to get caret position
  let typedChars: string[] = []; // typed chars is all characters typed including errors

  $: console.log(words);

  /* GAME STATE */
  let gameRunning = false;
  $: gameCompleted = currentChars.length === wordsToChars(words).length;

  function startTest() {
    gameRunning = true;
    startTime = currentTime();
  }

  function resetTest() {
    gameRunning = false;
    words = generateWords(wordCount);
    currentChars = [];
    typedChars = [];
    startTime = 0;
  }

  $: if (selectedWordCount) {
    // if we update word count or game completed, restart
    resetTest();
  }

  /* TIME */
  let startTime = 0;

  /* WPM */
  let wpm = 0;
  $: if (currentChars[currentChars.length - 1] === ' ') {
    // calcs wpm on spacebar
    wpm = calculateWPM(words, currentChars, startTime);
  }

  /* ACCURACY */
  let accuracy = 0;
  $: accuracy = calculateAccuracy(currentChars, typedChars, words);

  /* RESULTS */
  $: correct =
    JSON.stringify(currentChars) === JSON.stringify(wordsToChars(words));
</script>

<div class="app">
  <div class="content">
    <Header bind:selectedWordCount reset={resetTest} />
    <main>
      {#if !gameCompleted}
        <div class="counters">
          {#if !gameRunning}
            <h4>Type to start</h4>
          {:else}
            <Counter title="curr" count={currentWord.id} />
            <Counter title="words" count={words.length} />
            <Counter title="wpm" count={wpm} />
            <Counter title="accuracy" count={accuracy} />
          {/if}
        </div>
        <!-- <Timer {startTime} {gameRunning} /> -->
        <Keypress
          bind:currentChars
          bind:typedChars
          bind:gameRunning
          start={startTest}
          reset={resetTest}
        />
        <Words {words} {currentChars} />

        <Restart reset={resetTest} />
      {:else}
        <div>Game results</div>
      {/if}
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

  .counters {
    display: flex;
    justify-content: left;
    gap: 2rem;
  }
</style>
