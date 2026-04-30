<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  let { path }: { path: string } = $props();
  onMount(() => navigate(path));
</script>
