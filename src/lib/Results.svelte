<script lang="ts">
  import { wordsToChars } from '../utils/wordsToChars';

  import Counter from './Counter.svelte';
  export let words;
  export let currentChars;
  export let wpm;
  export let accuracy;
  export let duration: number;
  let seconds = (duration / 1000).toFixed(2);
</script>

<div class="result-container">
  <div class="big-stats">
    <h2>{wpm} wpm</h2>
    <h2>{accuracy}% accuracy</h2>
  </div>

  <div class="small-stats">
    <Counter count={seconds} title="seconds" />
    <Counter count={words} title="words" />
    <Counter count={currentChars.length} title="characters" />
  </div>
</div>

<style>
  .result-container {
    min-height: 10rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    margin-top: 2.5rem; /* margin to account for counter */
    /* justify-content: left; */
    /* gap: 2rem; */
  }

  .small-stats {
    display: flex;
    justify-content: left;
    gap: 2em;
  }

  .big-stats {
    display: flex;
    gap: 2em;
  }

  h2 {
    font-size: 3rem;
  }
</style>
