<script lang="ts">
  import RadioOptions from './RadioOptions.svelte';
  export let gameMetric: string | number;
  export let metricValue: string | number;
  export let reset: () => void;
</script>

<header>
  <h1 on:click={reset}>
    <span class="svel">Svel</span><span class="type">type</span>
  </h1>
  <div class="options">
    <RadioOptions options={['Time', 'Words']} bind:active={gameMetric} />
    <RadioOptions options={[15, 30, 60]} bind:active={metricValue} />
  </div>
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
    transition: 0.4s;
  }
  h1:hover {
    transform: translate(2px, -2px);
  }
  .type {
    color: #ff3e00;
  }

  h1:hover .type {
    color: rgb(208, 52, 0);
  }

  @media screen and (max-width: 415px) {
    header {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: flex-end;
  }
</style>
