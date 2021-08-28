<script lang="ts">
  import Letter from './Letter.svelte';
  export let word;
  export let key;
</script>

<span id={`word-${key}`} class="word">
  {#each word.characters as char, key}
    <Letter {char} {key} />
  {/each}
</span>

<style>
  .word {
    margin-bottom: 0.4rem;
  }
</style>
