<script lang="ts">
  import Counter from './lib/Counter.svelte';
  import Header from './lib/Header.svelte';
  import 'carbon-components-svelte/css/g100.css';
  import Words from './lib/Words.svelte';
  import Keypress from './lib/Keypress.svelte';
  import WordCountRadio from './lib/WordCountRadio.svelte';
  import { generateWords } from './utils/generate';
  import { wordsToChars } from './utils/wordsToChars';
  import StartButton from './lib/StartButton.svelte';
  import { Button } from 'carbon-components-svelte';
  import { calculateAccuracy } from './utils/calculateAccuracy';

  // default word count
  let selectedWordCount: string = '50';
  $: wordCount = parseInt(selectedWordCount);
  $: words = generateWords(wordCount);
  let currentChars: string[] = [];
  let typedChars: string[] = [];
  $: caretPosition = currentChars.length - 1;

  $: if (selectedWordCount) {
    // if we update the radio buttons, reset the game
    reset();
  }

  function reset() {
    console.log('resetting game');
    gameRunning = false;
    words = generateWords(wordCount);
    console.log(currentChars);

    currentChars = [];
    typedChars = [];
    wordsCompleted = 0;
    console.log(currentChars);
  }

  $: correct =
    JSON.stringify(currentChars) === JSON.stringify(wordsToChars(words));
  $: completed = currentChars.length === wordsToChars(words).length;

  $: console.log('100% Correct', correct);
  $: console.log('Challenge completed', completed);

  let gameRunning = false;

  function start() {
    gameRunning = true;
    console.log('game has started');
  }

  $: if (completed) {
    reset();
  }
  $: accuracy = calculateAccuracy(currentChars, typedChars, words);

  $: wordsCompleted = 0;
  $: if (currentChars[currentChars.length - 1] === ' ') {
    // todo this is a cheese way to do this that adds a word no matter where the space is
    console.log('is space');

    wordsCompleted += 1;
  }
</script>

<div class="app">
  <div class="content">
    <Header bind:selectedWordCount />
    <main>
      <div class="counters">
        {#if !gameRunning}
          <h4>Type to start</h4>
        {:else if !Number.isNaN(accuracy)}
          <Counter title="words" count={words.length} />
          <Counter title="completed" count={wordsCompleted} />
          <Counter title="%" count={accuracy} />
        {/if}
      </div>
      <Keypress
        bind:currentChars
        bind:typedChars
        bind:gameRunning
        {start}
        {reset}
      />
      <Words {words} {currentChars} />
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
