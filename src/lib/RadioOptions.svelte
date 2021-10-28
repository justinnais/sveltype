<script lang="ts">
  // your script goes here

  export let options: string[];
  export let active: string;

  function handleClick(option: string) {
    console.log('handleClick', option);
  }
</script>

<div class="root">
  {#each options as option}
    <div
      class="option"
      class:active={option === active}
      on:click={() => handleClick(option)}
    >
      {option}
    </div>
  {/each}
</div>

<style>
  .root {
    display: flex;
    gap: 0.75em;
  }
  .option {
    opacity: 50%;
    transition: 0.4s;
    cursor: pointer;
  }
  .option:hover {
    opacity: 100%;
  }
  .active {
    opacity: 100%;

    /* color: #ff3e00; */
  }
</style>
