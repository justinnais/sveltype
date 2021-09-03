<script lang="ts">
  import Caret from './Caret.svelte';
  import WordCountRadio from './WordCountRadio.svelte';

  export let selectedWordCount;
  export let reset: () => void;
</script>

<header>
  <h1 on:click={reset}>
    <Caret /><span class="svel">Svel</span><span class="type">type</span>
  </h1>
  <WordCountRadio bind:selected={selectedWordCount} />
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    cursor: pointer;
  }
  .type {
    color: #ff3e00;
  }
</style>
