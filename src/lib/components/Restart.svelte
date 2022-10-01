<script lang="ts">
  // your script goes here

  export let reset: () => void;
  let buttonRef;

  function handleClick() {
    // unfocus the button to prevent reseting on space
    buttonRef.blur();
    reset();
  }
</script>

<button
  bind:this={buttonRef}
  on:click={handleClick}
  class="self-center  bg-primary text-neutral-900 font-medium py-3 pl-3 pr-12 border border-transparent transition"
  id="restart-button">Restart</button
>

<style lang='postcss'>
  button:hover,
  button:focus {
    @apply text-neutral-100 translate-x-0.5 -translate-y-0.5
  }
</style>
