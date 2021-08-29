<script>
  import { RadioButtonGroup, RadioButton } from 'carbon-components-svelte';

  export let selected;

  $: console.log('word count', selected);
</script>

<div class="word-select">
  <RadioButtonGroup legendText="Words" bind:selected>
    <RadioButton labelText="10" value="10" />
    <RadioButton labelText="25" value="25" />
    <RadioButton labelText="50" value="50" />
    <RadioButton labelText="100" value="100" />
  </RadioButtonGroup>
</div>

<style>
  .word-select {
    display: flex;
    align-items: center;
  }
</style>
