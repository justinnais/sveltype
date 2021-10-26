<script>
  import { fade } from 'svelte/transition';
  import { RadioButtonGroup, RadioButton } from 'carbon-components-svelte';
  export let selected;
  // TODO add time based option
  // TODO add custom radio
</script>

<div class="word-select">
  <div class="metric">
    <!-- <span>Timer</span>
    <span>/</span> -->
    <span>Words</span>
  </div>
  <RadioButtonGroup bind:selected >
    <RadioButton labelText="10" value="10" />
    <RadioButton labelText="30" value="30" />
    <RadioButton labelText="60" value="60" />
  </RadioButtonGroup>
</div>

<style>
  .word-select {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    flex-direction: column;
    /* align-self: center; */
  }

  @media screen and (max-width: 415px) {
    .word-select {
      align-items: flex-start;
    }
  }
</style>
