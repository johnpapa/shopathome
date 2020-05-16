<script>
  import { Link } from 'svelte-routing';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let title = '';
  export let routePath = '';
  export let showAdd = true;

  function add() {
    dispatch('add');
  }
</script>

<div class="content-title-group">
  <Link to={routePath}>
    <h2 class="title">{title}</h2>
  </Link>
  {#if showAdd}
    <button class="button add-button" on:click={() => add()} aria-label="add">
      <i class="fas fa-plus" aria-hidden="true" />
    </button>
  {/if}
  <button
    class="button refresh-button"
    on:click={() => dispatch('refresh')}
    aria-label="refresh">
    <i class="fas fa-sync" aria-hidden="true" />
  </button>
</div>
