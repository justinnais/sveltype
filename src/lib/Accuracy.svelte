<script lang="ts">
  import type { IWord } from '../types/types';

  export let errors: string[];
  export let currentChars: string[];
  export let words: IWord[];

  $: index = currentChars.length - 1;

  const correctChars = words
    .map((word) => word.characters)
    .flat()
    .map((char) => char.char);

  // TODO this isn't working
  $: if (correctChars[index] !== currentChars[index]) {
    errors.push(currentChars[index]);
  }
</script>
