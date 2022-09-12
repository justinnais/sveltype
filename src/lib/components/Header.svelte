<script lang="ts">
  import RadioOptions from './RadioOptions.svelte';
  export let gameMetric: string | number;
  export let metricValue: string | number;
  export let reset: () => void;
</script>

<header class="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4 ">
  <h1
    on:click={reset}
    class="text-5xl font-light cursor-pointer transition hover:translate-x-0.5 hover:-translate-y-0.5"
  >
    <span class="svel">Svel</span><span class="text-[#ff3e00]">type</span>
  </h1>
  <div class="flex flex-col items-end">
    <RadioOptions options={['Time', 'Words']} bind:active={gameMetric} />
    <RadioOptions options={[15, 30, 60]} bind:active={metricValue} />
  </div>
</header>