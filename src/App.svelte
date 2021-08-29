<script lang="ts">
  import Counter from './lib/Counter.svelte';
  import Header from './lib/Header.svelte';
  import 'carbon-components-svelte/css/g100.css';
  import Words from './lib/Words.svelte';
  import Keypress from './lib/Keypress.svelte';
  import WordCountRadio from './lib/WordCountRadio.svelte';
  import { generateWords } from './utils/generate';
  import { wordsToChars } from './wordsToChars';

  // default word count
  let selectedWordCount: string = '50';
  $: wordCount = parseInt(selectedWordCount);
  $: words = generateWords(wordCount);
  let keyArray: string[] = [];
  $: caretPosition = keyArray.length - 1;

  $: if (selectedWordCount) {
    // if we update the radio buttons, reset the game
    reset();
  }

  function reset() {
    console.log('resetting game');
    keyArray = [];
  }

  $: correct = JSON.stringify(keyArray) === JSON.stringify(wordsToChars(words));
  $: completed = keyArray.length === wordsToChars(words).length;

  $: console.log('100% Correct', correct);
  $: console.log('Challenge completed', completed);
</script>

<div class="app">
  <div class="content">
    <Header />
    <main>
      <div><WordCountRadio bind:selected={selectedWordCount} /></div>
      <div class="counters">
        <Counter title="words" count={wordCount} />
        <Counter title="chars" count={wordsToChars(words).length} />
        <Counter title="position" count={caretPosition} />
      </div>
      <Keypress bind:keyArray />
      <Words {words} {keyArray} />
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
    min-width: 400px;
    max-width: 1000px;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    padding: 2rem;
    align-items: center;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 500px;
  }

  .counters {
    display: flex;
    justify-content: space-evenly;
  }
</style>
