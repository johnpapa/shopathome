<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import ProductDetail from '@/views/products/product-detail.vue';
import ProductList from '@/views/products/product-list.vue';
import store from '../../store';
import { Product } from '../../store/modules/models';

const captains = console;

interface ComponentState {
  errorMessage: Ref<string>;
  message: Ref<string>;
  productToDelete: Ref<Product | null>;
  routePath: Ref<string>;
  selected: Ref<Product | null>;
  showModal: Ref<boolean>;
  title: Ref<string>;
  count: Ref<number>;
  products: Ref<Product[]>;
}

export default defineComponent({
  name: 'Products',
  components: {
    ListHeader,
    ProductList,
    ProductDetail,
    Modal,
  },

  setup() {
    const state: ComponentState = {
      errorMessage: ref(''),
      message: ref(''),
      productToDelete: ref(null),
      routePath: ref('/products'),
      selected: ref(null),
      showModal: ref(false),
      title: ref('My List'),
      count: ref(0),
      products: computed(() => store.getters.products as Product[]),
    };

    function askToDelete(p: Product) {
      state.productToDelete.value = p;
      state.showModal.value = true;
      if (state.productToDelete.value.name) {
        state.message.value = `Would you like to delete ${state.productToDelete.value.name}?`;
        captains.log(state.message.value);
      }
    }

    function clear() {
      state.productToDelete.value = null;
      state.selected.value = null;
      state.message.value = '';
    }

    function closeModal() {
      state.showModal.value = false;
    }

    async function deleteProduct() {
      closeModal();
      if (state.productToDelete.value) {
        captains.log(
          `You said you want to delete ${state.productToDelete.value.name}`,
        );
        await store.dispatch(
          'deleteProductAction',
          state.productToDelete.value,
        );
      }
      clear();
    }

    function enableAddMode() {
      state.selected.value = new Product(0);
    }

    async function getProducts() {
      state.errorMessage.value = '';
      try {
        await store.dispatch('getProductsAction');
      } catch (error) {
        state.errorMessage.value = 'Unauthorized';
      }
      clear();
    }

    // create a js module that handles all saving activity
    // save, delete, add => in the module
    // useSavingProducts(state);
    async function save(p: Product) {
      captains.log('product changed', p);
      if (p.id) {
        await store.dispatch('updateProductAction', p);
      } else {
        await store.dispatch('addProductAction', p);
      }
    }

    function select(p: Product) {
      state.selected.value = p;
    }

    onMounted(async () => getProducts());

    return {
      ...state,
      askToDelete,
      clear,
      closeModal,
      deleteProduct,
      enableAddMode,
      getProducts,
      save,
      select,
    };
  },
});
</script>

<template>
  <div class="content-container">
    <ListHeader
      :title="title"
      @refresh="getProducts"
      @add="enableAddMode"
      :routePath="routePath"
    ></ListHeader>
    <div class="columns is-multiline is-variable">
      <div class="column is-8" v-if="products">
        <ProductList
          v-if="!selected"
          :products="products"
          :errorMessage="errorMessage"
          @selected="select($event)"
          @deleted="askToDelete($event)"
        ></ProductList>
        <ProductDetail
          v-if="selected"
          :product="selected"
          @unselect="clear"
          @save="save"
        ></ProductDetail>
      </div>
    </div>

    <Modal
      class="modal-product"
      :message="message"
      :isOpen="showModal"
      @handle-no="closeModal"
      @handle-yes="deleteProduct"
    ></Modal>
  </div>
</template>
