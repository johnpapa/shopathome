<script lang="ts">
  import { Link } from 'svelte-routing';

  interface Props {
    title?: string;
    routePath?: string;
    showAdd?: boolean;
    onadd?: () => void;
    onrefresh?: () => void;
  }

  let { title = '', routePath = '', showAdd = true, onadd, onrefresh }: Props = $props();
</script>

<div class="content-title-group">
  <Link to={routePath}>
    <h2 class="title">{title}</h2>
  </Link>
  {#if showAdd}
    <button class="button add-button" onclick={() => onadd?.()} aria-label="add">
      <i class="fas fa-plus" aria-hidden="true"></i>
    </button>
  {/if}
  <button
    class="button refresh-button"
    onclick={() => onrefresh?.()}
    aria-label="refresh">
    <i class="fas fa-sync" aria-hidden="true"></i>
  </button>
</div>
