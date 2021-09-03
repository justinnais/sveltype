<script lang="ts">
  // your script goes here

  import { Button } from 'carbon-components-svelte';

  export let reset: () => void;
</script>

<Button on:click={reset}>Restart</Button>

<style>
  /* your styles go here */
</style>
