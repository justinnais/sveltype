import { generateWords } from '$lib/utils';
import type { LoadEvent } from '@sveltejs/kit';

export function load({ params }: LoadEvent) {
  const words = generateWords(30);
  return {
    words
  };
}

// ssr was causing an issue where word list would load on server, then on client, then jumbling them
// not sure if this is the best approach
export const ssr = false;
