<script>
  // your script goes here
</script>

<!-- markup (zero or more items) goes here -->

<div class="caret" />

<style>
  .caret {
    height: 1.5rem;
    width: 0.2rem;
    background-color: aqua;
    animation: blink-animation 1.2s steps(3, start) infinite;
    -webkit-animation: blink-animation 1.2s steps(3, start) infinite;
  }
  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
</style>
