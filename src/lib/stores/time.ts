import { readable, derived } from 'svelte/store';
import { game } from '$lib/stores';

const time = readable(new Date(), (set) => {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  // todo need to understand how to unsubscribe before in use
  return () => {
    clearInterval(interval);
  };
});

export const elapsed = derived([time, game], ([$time, $game]) => {
  const diff = $time.getTime() - $game.time.start;
  const duration = Math.ceil(diff / 1000);
  if ($game.time.start === 0 || duration < 0) {
    return 0;
  }
  return duration;
});
