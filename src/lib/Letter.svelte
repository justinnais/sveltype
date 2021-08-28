<script lang="ts">
  import type { LetterStatus } from 'src/types/types';
  export let char;
  export let key;
  export let status: LetterStatus = undefined;
  let space = '&nbsp;';
</script>

<letter
  class="char"
  class:correct={status === true}
  class:incorrect={status === false}
  id={`char-${key + 1}`}>{@html char === ' ' ? space : char}</letter
>

<style>
  .char {
    color: grey;
    margin: 0.1rem;
  }
  .correct {
    color: white;
  }
  .incorrect {
    color: red;
  }


</style>
