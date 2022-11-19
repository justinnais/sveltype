import type { GameMode } from '$lib/types';
import { writable } from 'svelte/store';
import { game } from './game';

const defaultSettings = {
  mode: 'TIME',
  count: 30
} as const;

interface Settings {
  mode: GameMode;
  count: number;
}

function createSettingsStore() {
  const { subscribe, set } = writable<Settings>({ ...defaultSettings });

  return {
    subscribe,
    set,
    changeSettings: (mode: GameMode, count: number) => game.reset(mode, count)
  };
}

export const settings = createSettingsStore();
