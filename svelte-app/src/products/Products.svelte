<script lang="ts">
  import { onMount } from 'svelte';
  import { ListHeader, Modal } from '../components';
  import ProductList from './ProductList.svelte';
  import ProductDetail from './ProductDetail.svelte';
  import {
    state,
    getProductsAction,
    deleteProductAction,
    addProductAction,
    updateProductAction,
  } from '../store';
  import { Product } from '../models';
  import { logRouteLocation } from '../config';

  const { products } = state;

  export let location: Object = {};
  logRouteLocation(location);

  let selectedProduct: Product = undefined;
  let routePath = '/products';
  let title = 'My List';
  let productToDelete: Product = null;
  let message = '';
  let showModal = false;
  let errorMessage = '';

  onMount(async () => await getProducts());

  function enableAddMode() {
    selectedProduct = null;
  }

  function askToDelete({ detail: product }) {
    productToDelete = product;
    showModal = true;
    if (productToDelete.name) {
      message = `Would you like to delete ${productToDelete.name}?`;
    }
  }

  function clear() {
    selectedProduct = null;
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
    errorMessage = undefined;
    try {
      await getProductsAction();
    } catch (error) {
      errorMessage = 'Unauthorized';
    }
  }

  async function save({ detail: product }) {
    console.log('product changed', product);
    if (product.id) {
      await updateProductAction(product);
    } else {
      await addProductAction(product);
    }
  }

  function selectProduct({ detail: product }) {
    selectedProduct = product;
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
        {#if !selectedProduct}
          <ProductList
            {errorMessage}
            products={$products}
            on:deleted={askToDelete}
            on:selected={selectProduct} />
        {:else}
          <ProductDetail
            product={selectedProduct}
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
