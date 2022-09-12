<script>
  import '$lib/styles/global.css';
</script>

<div
  class="w-full max-w-5xl grid grid-flow-row grid-rows-[auto_1fr] min-h-screen p-8 items-center gap-8"
>
  <!-- <Header bind:metricValue bind:gameMetric reset={resetGame} /> -->
  <main class="flex flex-col justify-between gap-4">
    <slot />
  </main>
</div>
