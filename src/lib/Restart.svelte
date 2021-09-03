<script lang="ts">
  // your script goes here

  import { Button } from 'carbon-components-svelte';

  export let reset: () => void;
</script>

<button on:click={reset} class="bx--btn" tabindex="0">Restart</button>

<style>
  button {
    align-self: center;
    background-color: #ff3e00;
    border: 1px solid transparent;
    color: var(--cds-text-04, #fff);
  }

</style>
