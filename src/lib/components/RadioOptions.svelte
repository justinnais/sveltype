<script lang="ts">
  export let options: (string | number)[];
  export let active: string | number;

  function handleClick(option: string | number) {
    active = option;
  }
</script>

<div class="root">
  {#each options as option}
    <span class="option" class:active={option === active} on:click={() => handleClick(option)}>
      {option}
    </span>
  {/each}
</div>

<style>
  .root {
    display: flex;
    gap: 0.75em;
  }
  .option {
    opacity: 50%;
    transition: 0.25s;
    cursor: pointer;
  }
  .active {
    opacity: 100%;
  }
  /* adjust the opacity of siblings when hovering an option */
  .root:hover .option {
    opacity: 50%;
  }
  .root .option:hover {
    opacity: 100%;
    transform: translate(1px, -1px);
  }
</style>
