<script>
  import '$lib/styles/global.css';
</script>

<div
  class="w-full max-w-5xl grid grid-flow-row grid-rows-[auto_1fr] min-h-screen p-8 items-center gap-8"
>
  <header class="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-4 ">
    <h1
      class="text-5xl font-serif cursor-pointer underline decoration-wavy decoration-primary decoration-2 underline-offset-4"
    >
      <a href="/">sveltype</a>
    </h1>
  </header>
  <main class="flex flex-col justify-between gap-4">
    <slot />
  </main>
</div>
