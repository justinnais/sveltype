<script lang="ts">
  export let gameRunning: boolean;
  export let startTime: number;
  export let testLength = 60000;

  $: finishTime = startTime + testLength;

  let timer = setInterval(() => {
    let now = new Date().getTime();
    let timeLeft = finishTime - now;

    secondsRemaining = Math.floor((timeLeft / 1000) % 60);
  }, 1000);

  if (gameRunning) {
    timer;
  } else {
    clearInterval(timer);
  }

  let secondsRemaining = testLength / 1000;
</script>

<h1>{secondsRemaining} seconds</h1>
<span>{startTime}</span>
<span>{finishTime}</span>

<style>
  /* your styles go here */
</style>
