<div class="caret" />

<style>
  .caret {
    position: absolute;
    transform: translateX(-1px);
    display: inline-flex;
    height: 1em;
    width: 2px;
    background-color: #ff3e00;
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
