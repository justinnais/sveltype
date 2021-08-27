<script lang="ts">
  // https://svelte.dev/tutorial/svelte-window
  let key;

  function handleKeypress(event) {
    key = event.key;
  }

  $: console.log(key);
</script>

<svelte:window on:keydown={handleKeypress} />

<div>{key}</div>

<!-- markup (zero or more items) goes here -->
<style>
  /* your styles go here */
</style>
