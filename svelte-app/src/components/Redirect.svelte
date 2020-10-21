<script lang="ts">
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-routing';
  export let path: string;
  onMount(() => navigate(path));
</script>
