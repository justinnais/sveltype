<script lang="ts">
  import logo from './assets/svelte.png';
  import Counter from './lib/Counter.svelte';
  import Header from './lib/Header.svelte';
  import 'carbon-components-svelte/css/g100.css';
  import { Container } from 'sveltestrap';
  import Words from './lib/Words.svelte';
  import Keypress from './lib/Keypress.svelte';

  let wordCount: number = 10;
  let charCount: number = 0;
</script>

<div class="app">
  <div class="content">
    <Header />
    <main>
      <section>
        <input type="number" bind:value={wordCount} min="10" max="100" />
        <Counter title="words" count={wordCount} />
        <Counter title="chars" count={charCount} />
        <Keypress />
        <Words bind:wordCount bind:charCount />
      </section>
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

  section {
    border: 1px blue solid;
  }
</style>
