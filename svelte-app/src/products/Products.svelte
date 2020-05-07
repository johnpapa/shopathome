<script>
  import { onMount } from 'svelte';
  import { ListHeader, Modal } from '../components';
  import ProductList from './ProductList.svelte';
  import ProductDetail from './ProductDetail.svelte';
  import {
    state,
    getProductsAction,
    deleteProductAction,
    addProductAction,
    updateProductAction
  } from '../store';

  const { products } = state;

  let selected = undefined;
  let routePath = '/products';
  let title = 'Products';
  let productToDelete = null;
  let message = '';
  let showModal = false;

  onMount(async () => await getProducts());

  function enableAddMode() {
    selected = {};
  }

  function askToDelete({ detail: product }) {
    productToDelete = product;
    showModal = true;
    if (productToDelete.name) {
      message = `Would you like to delete ${productToDelete.name}?`;
    }
  }

  function clear() {
    selected = null;
  }

  function closeModal() {
    showModal = false;
  }

  async function deleteProduct() {
    closeModal();
    if (productToDelete) {
      console.log(`You said you want to delete ${productToDelete.name}`);
      await deleteProductAction(productToDelete);
    }
    clear();
  }

  async function getProducts() {
    await getProductsAction();
  }

  async function save({ detail: product }) {
    console.log('product changed', product);
    if (product.id) {
      await updateProductAction(product);
    } else {
      await addProductAction(product);
    }
  }

  function select({ detail: product }) {
    selected = product;
    console.log(`selected ${product.name}`);
  }
</script>

<div class="content-container">
  <ListHeader
    {title}
    {routePath}
    on:add={enableAddMode}
    on:refresh={getProducts} />
  <div class="columns is-multiline is-variable">
    {#if products}
      <div class="column is-8">
        {#if !selected}
          <ProductList
            products={$products}
            on:deleted={askToDelete}
            on:selected={select} />
        {:else}
          <ProductDetail
            product={selected}
            on:unselect={clear}
            on:save={save} />
        {/if}
      </div>
    {/if}
  </div>

  <Modal
    {message}
    isOpen={showModal}
    on:handleNo={closeModal}
    on:handleYes={deleteProduct} />
</div>
