<div class="caret" />

<style lang="postcss">
  .caret {
    @apply absolute -translate-x-px inline-flex h-[1em] w-0.5 bg-primary;
    animation: blink 1.2s steps(3, start) infinite;
    -webkit: blink 1.2s steps(3, start) infinite;
  }
  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink {
    to {
      visibility: hidden;
    }
  }
</style>
