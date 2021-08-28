<script lang="ts">
  import Counter from './lib/Counter.svelte';
  import Header from './lib/Header.svelte';
  import 'carbon-components-svelte/css/g100.css';
  import Words from './lib/Words.svelte';
  import Keypress from './lib/Keypress.svelte';
  import WordCountRadio from './lib/WordCountRadio.svelte';
  import { generateWords } from './utils/generate';

  let selectedWordCount: string = '50';
  $: wordCount = parseInt(selectedWordCount);
  $: wordObjects = generateWords(wordCount);
  $: words = wordObjects.map((item) => item.word);
  $: chars = wordObjects.map((item) => item.characters).flat();
  $: console.log(chars);
  
  $: sentence = chars.join('');
  $: caretPosition = keyArray.length - 1;
  let keyArray: string[] = [];

  function correct(keyArray) {
    const charsMatch = chars[caretPosition] === keyArray[caretPosition];
    console.log(
      `pos ${caretPosition}`,
      chars[caretPosition],
      keyArray[caretPosition],
      charsMatch
    );
    return charsMatch;
  }
  $: isCorrect = correct(keyArray);
</script>

<div class="app">
  <div class="content">
    <Header />
    <main>
      <div><WordCountRadio bind:selected={selectedWordCount} /></div>
      <div class="counters">
        <Counter title="words" count={wordCount} />
        <Counter title="chars" count={chars.length} />
        <Counter title="position" count={caretPosition} />
      </div>
      <Keypress bind:keyArray />
      <div>
        {#each keyArray as key}
          <span class:correct={isCorrect}>{key}</span>
        {/each}
      </div>
      <Words words={wordObjects} />
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
    border: 1px blue solid;
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
