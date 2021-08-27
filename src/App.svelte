<script lang="ts">
  import logo from './assets/svelte.png';
  import Counter from './lib/Counter.svelte';
  import Header from './lib/Header.svelte';
  import 'carbon-components-svelte/css/g100.css';
  import { Container } from 'sveltestrap';
  import Words from './lib/Words.svelte';
</script>

<div class="app">
  <div class="content">
    <Header />
    <main>
      <section>
        <Words count={10} />
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
