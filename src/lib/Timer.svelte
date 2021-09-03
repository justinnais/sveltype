<script>
  let startTime = 0;
  let duration = (currentTime() - startTime) / 60000;

  function currentTime() {
    return new Date().getTime();
  }

  export let gameRunning;

  if (gameRunning) {
    startTime = currentTime();
  }

</script>

<h1>{startTime}</h1>

<style>
  /* your styles go here */
</style>
