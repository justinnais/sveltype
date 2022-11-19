import { readable, derived } from 'svelte/store';
import { game, settings } from '$lib/stores';
import { GameState, type Game } from '$lib/types';

const timer = readable(new Date(), (set) => {
  let g: Game;
  const unsubscribe = game.subscribe((value) => {
    g = value;
  });
  const interval = setInterval(() => {
    if (g.state === GameState.STARTED) {
      set(new Date());
    }
  }, 1000);

  // todo need to understand how to unsubscribe before in use
  // ! this is never firing
  return () => {
    console.log('cleanup');
    clearInterval(interval);
    unsubscribe();
  };
});

export const time = derived([timer, game, settings], ([$timer, $game, $settings]) => {
  // TODO this isn't accurate enough
  const diff = $timer.getTime() - $game.time.start;
  const duration = Math.floor(diff / 1000);
  let elapsed = duration;
  if ($game.time.start === 0 || duration < 0) {
    elapsed = 0;
  }

  const remaining = $settings.count - elapsed;

  if ($settings.mode === 'TIME' && remaining <= 0) {
    // TODO this crashes the app
    // game.end();
  }

  return {
    elapsed,
    remaining
  };
});
