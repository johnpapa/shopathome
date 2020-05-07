<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { ButtonFooter } from '../components';

  const dispatch = createEventDispatcher();
  export let product = {};
  let addMode = false;
  let editingProduct = { ...product };

  onMount(() => watchProduct());

  function clear() {
    dispatch('unselect');
  }

  function saveProduct() {
    dispatch('save', editingProduct);
    clear();
  }

  function watchProduct() {
    if (product && product.id) {
      editingProduct = { ...product };
      addMode = false;
    } else {
      editingProduct = { id: undefined, name: '', description: '' };
      addMode = true;
    }
  }

  const cancelOptions = {
    className: 'card-footer-item cancel-button',
    label: 'Cancel',
    iconClasses: 'fas fa-undo'
  };

  const saveOptions = {
    className: 'card-footer-item save-button',
    label: 'Save',
    iconClasses: 'fas fa-save'
  };
</script>

<div class="card edit-detail">
  <header class="card-header">
    <p class="card-header-title">{editingProduct.name}</p>
  </header>
  <div class="card-content">
    <div class="content">
      {#if editingProduct.id}
        <div class="field">
          <label class="label" for="id">id</label>
          <input
            class="input"
            name="id"
            placeholder="99999"
            readonly
            type="text"
            bind:value={editingProduct.id} />
        </div>
      {/if}
      <div class="field">
        <label class="label" for="name">name</label>
        <input
          class="input"
          name="name"
          placeholder="Oranges"
          type="text"
          bind:value={editingProduct.name} />
      </div>
      <div class="field">
        <label class="label" for="description">description</label>
        <input
          class="input"
          name="description"
          placeholder="box"
          type="text"
          bind:value={editingProduct.description} />
      </div>
      <div class="field">
        <label class="label" for="quantity">quantity</label>
        <input
          class="input"
          name="quantity"
          placeholder="1"
          type="number"
          min="1"
          max="100"
          bind:value={editingProduct.quantity} />
      </div>
    </div>
  </div>

  <footer class="card-footer">
    <ButtonFooter {...cancelOptions} item={editingProduct} on:clicked={clear} />
    <ButtonFooter
      {...saveOptions}
      item={editingProduct}
      on:clicked={saveProduct} />
  </footer>
</div>
