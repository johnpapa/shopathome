<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let item = undefined;
  export let className = '';
  export let label = '';
  export let dataIndex = 0;
  export let dataId = '';
  export let iconClasses = '';

  function handleClick() {
    console.log(`button clicked ${JSON.stringify(item)}`);
    dispatch('clicked', item);
  }
</script>

<button
  class="link card-footer-item {className}"
  aria-label={label}
  tabindex="0"
  on:click={handleClick}
  data-index={dataIndex}
  data-id={dataId}>
  <i class={iconClasses} />
  <span>{label}</span>
</button>
