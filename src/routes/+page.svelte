<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { game, time } from '$lib/stores';
  import { Words, Keypress, Restart, Results, Counters, RadioOptions } from '$lib/components';
  import { wordsToChars, calculateAccuracy, getCurrentWord } from '$lib/utils';
  import { GameState, type GameMode, type WpmMetrics } from '$lib/types';

  $: currentWord = getCurrentWord($game.words, $game.characters);

  /* GAME STATE */
  const gameOptions: GameMode[] = ['TIME', 'WORDS'];

  $: finishedWords =
    $game.mode === 'WORDS' && $game.characters.length === wordsToChars($game.words).length;
  $: outOfTime = $game.mode === 'TIME' && $time.remaining <= 0;

  $: if (finishedWords || outOfTime) {
    game.end();
  }
  // I want this to update the game settings when the radio buttons change, but it is firing every keypress
  // TODO maybe move settings into their own store
  // $: game.changeSettings($game.mode, $game.count)

  $: console.log($game.mode);

  let wpm: WpmMetrics = { raw: 0, net: 0 };
  let accuracy = 0;
  $: accuracy = calculateAccuracy($game.characters, $game.errors.total);
</script>

<div class="flex flex-col items-end lowercase font-medium">
  <RadioOptions options={gameOptions} bind:active={$game.mode} />
  <RadioOptions options={[15, 30, 60]} bind:active={$game.count} />
</div>
<div class="transition-force">
  {#if $game.state === GameState.ENDED}
    <div>
      <Results words={$game.words.length} characters={$game.characters} {wpm} {accuracy} />
    </div>
  {:else}
    <div out:fly={{ y: -20, duration: 250 }} in:fade={{ duration: 500 }}>
      <Counters {currentWord} words={$game.words} {wpm} {accuracy} />
      <Keypress words={$game.words} bind:wpm />
      <Words words={$game.words} characters={$game.characters} {currentWord} />
    </div>
  {/if}
</div>
<Restart reset={game.reset} />

<style>
  .transition-force {
    display: grid;
  }
  .transition-force > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }
</style>
