<script lang="ts">
  import { fly } from 'svelte/transition';
  export let words;
  export let currentChars;
  export let wpm;
  export let accuracy;
  export let errors;
  export let duration: number;
  let seconds = (duration / 1000).toFixed(2);
</script>

<div class="result-container" in:fly={{y:20, duration:1000}}>
  <div class="big-stats">
    <h2>{wpm} wpm</h2>
    <h2>{accuracy}% accuracy</h2>
  </div>

  <div class="small-stats">
    <h4>{seconds} seconds</h4>
    <h4>{words} words</h4>
    <h4>{currentChars.length} characters</h4>
    <h4>{errors} error{errors === 1 ? '' : 's'}</h4>
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
