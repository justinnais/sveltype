<script lang="ts">
  import Caret from './Caret.svelte';
  // import type { LetterStatus } from 'src/types/types';
  // export let char;
  // export let key;
  // export let status: LetterStatus = undefined;
  // let space = '&nbsp;';
  export let id;
  export let keyArray;
  export let chars;

  $: touched = keyArray.length > id;
  $: isCorrect = chars[id] === keyArray[id];

  // function isCorrect(keyArray) {
  //   const charsMatch = chars[id] === keyArray[id];
  //   console.log(id, chars[id], keyArray[id]);
  //   return charsMatch;
  // }
</script>

<span class="span">
  <!-- <Caret /> -->
  <span
    id={`char-${id}`}
    class="char"
    class:correct={isCorrect}
    class:incorrect={!isCorrect && touched}
  >
    <slot />
  </span>
</span>

<style>
  .span {
    display: inline-flex;
  }
  .char {
    color: grey;
    /* margin: 0.1rem; */
  }
  .correct {
    color: white;
  }
  .incorrect {
    color: red;
  }
</style>
