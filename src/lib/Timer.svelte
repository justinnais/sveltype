<script lang="ts">
  // export let gameRunning: boolean;
  export let startTime: number;
  export let testLength: number = 60000;
  export let elapsedSeconds: number;

  $: secondsRemaining = testLength / 1000 - elapsedSeconds;

  console.log('test', testLength /1000)
  console.log('elaps', elapsedSeconds)
</script>

<h1>{secondsRemaining} seconds</h1>
<span>{startTime}</span>
<!-- <span>{finishTime}</span> -->

<style>
  /* your styles go here */
</style>
