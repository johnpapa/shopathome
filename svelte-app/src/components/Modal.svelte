<script lang="ts">
  interface Props {
    message?: string;
    isOpen?: boolean;
    onno?: () => void;
    onyes?: () => void;
  }

  let { message = '', isOpen = false, onno, onyes }: Props = $props();
</script>

<div id="modal" class="modal" class:is-active={isOpen}>
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Confirm</p>
    </header>
    <section class="modal-card-body">{message}</section>
    <footer class="modal-card-foot">
      <button class="button modal-no" onclick={() => onno?.()}>No</button>
      <button class="button is-primary modal-yes" onclick={() => onyes?.()}>Yes</button>
    </footer>
  </div>
</div>
