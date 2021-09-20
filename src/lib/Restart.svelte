<script lang="ts">
  // your script goes here

  import { TooltipIcon } from 'carbon-components-svelte';

  export let reset: () => void;
  
  let buttonRef;

  function handleClick() {
    // unfocus the button to prevent reseting on space
    buttonRef.blur()
    reset()
  }
</script>

<button bind:this={buttonRef} on:click={handleClick} class="bx--btn" tabindex="1">Restart</button>
<style>
  button {
    align-self: center;
    background-color: #ff3e00;
    border: 1px solid transparent;
    color: var(--cds-text-04, #fff);
    transition: 0.5s;
  }

  button:hover, button:focus {
    transform: scale(1.05);
    background-color: rgb(208, 52, 0);
  }
</style>
