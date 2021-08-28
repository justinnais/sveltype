<script>
  import { RadioButtonGroup, RadioButton } from 'carbon-components-svelte';

  export let selected;

  $: console.log('word count', selected)
</script>

<RadioButtonGroup legendText="Words" bind:selected>
  <RadioButton labelText="10" value="10" />
  <RadioButton labelText="25" value="25" />
  <RadioButton labelText="50" value="50" />
  <RadioButton labelText="100" value="100" />
</RadioButtonGroup>
