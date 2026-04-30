<script lang="ts">
  import { onMount } from 'svelte';
  import { ListHeader, Modal } from '../components';
  import ProductList from './ProductList.svelte';
  import ProductDetail from './ProductDetail.svelte';
  import {
    state as appState,
    getProductsAction,
    deleteProductAction,
    addProductAction,
    updateProductAction,
  } from '../store';
  import { Product } from '../models';

  const { products } = appState;

  let selectedProduct: Product | null = $state(null);
  let routePath = '/products';
  let title = 'My List';
  let productToDelete: Product | null = $state(null);
  let message = $state('');
  let showModal = $state(false);
  let errorMessage: string | undefined = $state('');

  onMount(async () => await getProducts());

  function enableAddMode() {
    selectedProduct = null;
  }

  function askToDelete(product: Product) {
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

  async function save(product: Product) {
    console.log('product changed', product);
    if (product.id) {
      await updateProductAction(product);
    } else {
      await addProductAction(product);
    }
  }

  function selectProduct(product: Product) {
    selectedProduct = product;
    console.log(`selected ${product.name}`);
  }
</script>

<div class="content-container">
  <ListHeader
    {title}
    {routePath}
    onadd={enableAddMode}
    onrefresh={getProducts}
  />
  <div class="columns is-multiline is-variable">
    {#if products}
      <div class="column is-8">
        {#if !selectedProduct}
          <ProductList
            {errorMessage}
            products={$products}
            ondeleted={askToDelete}
            onselected={selectProduct}
          />
        {:else}
          <ProductDetail
            product={selectedProduct}
            onunselect={clear}
            onsave={save}
          />
        {/if}
      </div>
    {/if}
  </div>

  <Modal
    {message}
    isOpen={showModal}
    onno={closeModal}
    onyes={deleteProduct}
  />
</div>
