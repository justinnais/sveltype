<script lang="ts">
  import Caret from './Caret.svelte';
  import MetricRadio from './MetricRadio.svelte';

  export let selectedWordCount;
  export let reset: () => void;
</script>

<header>
  <h1 on:click={reset}>
    <Caret /><span class="svel">Svel</span><span class="type">type</span>
  </h1>
  <MetricRadio bind:selected={selectedWordCount} />
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
  }

  h1 {
    cursor: pointer;
  }
  .type {
    color: #ff3e00;
  }

  @media screen and (max-width: 415px) {
    header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
