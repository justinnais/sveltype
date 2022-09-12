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
  class="self-center bg-[#ff3e00] text-white text-sm py-3 pl-3 pr-12 border border-transparent transition"
  id="restart-button">Restart</button
>

<style>
  button:hover,
  button:focus {
    transform: translate(2px, -2px);
  }
</style>
