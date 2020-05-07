<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let message = '';
  export let isOpen = false;

  function onNo() {
    dispatch('handleNo');
  }
  function onYes() {
    dispatch('handleYes');
  }
</script>

<div id="modal" class="modal" class:is-active={isOpen}>
  <div class="modal-background" />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Confirm</p>
    </header>
    <section class="modal-card-body">{message}</section>
    <footer class="modal-card-foot">
      <button class="button modal-no" on:click={onNo}>No</button>
      <button class="button is-primary modal-yes" on:click={onYes}>Yes</button>
    </footer>
  </div>
</div>
