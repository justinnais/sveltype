<script lang="ts">
  export let count: number = 0;
  export let title: string;
  const increment = () => {
    count += 1;
  };
</script>

<div>
  <h2>{count} {title}</h2>
</div>

<style>
</style>
