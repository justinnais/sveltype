<script lang="ts">
  import { wordsToChars } from '$lib/utils';
  import type { IWord } from '$lib/types';

  export let id: number;
  export let characters: string[];
  export let words: IWord[];

  const correctChars = wordsToChars(words);

  $: touched = characters.length > id;
  $: isCorrect = correctChars[id].char === characters[id];
  $: showCaret = characters.length === id;
</script>

<span
  id={`char-${id}`}
  class="letter"
  class:incorrect={touched && !isCorrect}
  class:incorrect-space={touched && !isCorrect && correctChars[id].char === ' '}
  class:correct={touched && isCorrect}
  class:caret={showCaret}
>
  <slot />
</span>

<style lang="postcss">
  .letter {
    @apply text-neutral-500 inline-flex py-0 px-px;
  }
  .correct {
    @apply text-neutral-100;
  }
  .incorrect {
    @apply text-primary/60;
  }
  .incorrect-space {
    @apply bg-primary/60;
  }
  .caret {
    @apply before:content-['|'] before:w-0 before:-translate-x-[0.4375rem] before:text-primary;
  }

  .caret::before {
    animation: blink 1.2s steps(3, start) infinite;
    -webkit: blink 1.2s steps(3, start) infinite;
  }

  @keyframes blink {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink {
    to {
      visibility: hidden;
    }
  }
</style>
