<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  export let path;
  onMount(() => navigate(path));
</script>
