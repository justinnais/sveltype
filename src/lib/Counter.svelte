<script lang="ts">
  export let count;
  export let title: string;
  const increment = () => {
    count += 1;
  };
</script>

<div>
  <h4>{count} {title}</h4>
</div>

<style>
</style>
