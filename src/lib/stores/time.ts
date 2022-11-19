import { readable, derived } from 'svelte/store';
import { game } from '$lib/stores';

const timer = readable(new Date(), (set) => {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  // todo need to understand how to unsubscribe before in use
  return () => {
    clearInterval(interval);
  };
});

export const time = derived([timer, game], ([$time, $game]) => {
  const diff = $time.getTime() - $game.time.start;
  const duration = Math.ceil(diff / 1000);
  let elapsed = duration;
  if ($game.time.start === 0 || duration < 0) {
    elapsed = 0;
  }

  const remaining = $game.count - elapsed;

  if ($game.mode === 'TIME' && remaining <= 0) {
    // TODO this crashes the app
    // game.end();
  }

  return {
    elapsed,
    remaining
  };
});
