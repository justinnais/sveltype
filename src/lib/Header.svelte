<script>
  import Caret from './Caret.svelte';
  import WordCountRadio from './WordCountRadio.svelte';

  export let selectedWordCount;
</script>

<header>
  <h1><Caret /><span class="svel">Svel</span><span class="type">type</span></h1>
  <WordCountRadio bind:selected={selectedWordCount} />
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }
  .type {
    color: #ff3e00;
  }
</style>
