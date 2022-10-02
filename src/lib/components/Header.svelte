<script lang="ts">
  import RadioOptions from './RadioOptions.svelte';
  export let gameMetric: string | number;
  export let metricValue: string | number;
  // export let reset: () => void;
</script>

<header class="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4 ">
  <h1
    class="text-5xl font-serif cursor-pointer underline decoration-wavy decoration-primary decoration-2 underline-offset-4"
  >
    sveltype
  </h1>
  <!-- <div class="flex flex-col items-end lowercase font-medium">
    <RadioOptions options={['Words']} bind:active={gameMetric} />
    <RadioOptions options={[15, 30, 60]} bind:active={metricValue} />
  </div> -->
</header>
