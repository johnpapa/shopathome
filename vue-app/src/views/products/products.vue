<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import ProductDetail from '@/views/products/product-detail.vue';
import ProductList from '@/views/products/product-list.vue';
import store from '../../store';
import { Product } from '../../store/modules/models';

const captains = console;

interface ComponentState {
  errorMessage: string;
  message: string;
  productToDelete: Product | null;
  routePath: string;
  selected: Product | null;
  showModal: boolean;
  title: string;
  count: number;
  products: Product[];
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
    const state: ComponentState = reactive({
      errorMessage: '',
      message: '',
      productToDelete: null,
      routePath: '/products',
      selected: null,
      showModal: false,
      title: 'My List',
      count: 0,
      products: computed(() => store.getters.products as Product[]),
    });

    function askToDelete(p: Product) {
      state.productToDelete = p;
      state.showModal = true;
      if (state.productToDelete.name) {
        state.message = `Would you like to delete ${state.productToDelete.name}?`;
        captains.log(state.message);
      }
    }
    function clear() {
      state.productToDelete = null;
      state.selected = null;
      state.message = '';
    }
    function closeModal() {
      state.showModal = false;
    }
    async function deleteProduct() {
      closeModal();
      if (state.productToDelete) {
        captains.log(
          `You said you want to delete ${state.productToDelete.name}`,
        );
        await store.dispatch('deleteProductAction', state.productToDelete);
      }
      clear();
    }
    function enableAddMode() {
      state.selected = new Product(0);
    }
    async function getProducts() {
      state.errorMessage = '';
      try {
        await store.dispatch('getProductsAction');
      } catch (error) {
        state.errorMessage = 'Unauthorized';
      }
      clear();
    }
    async function save(p: Product) {
      captains.log('product changed', p);
      if (p.id) {
        await store.dispatch('updateProductAction', p);
      } else {
        await store.dispatch('addProductAction', p);
      }
    }
    function select(p: Product) {
      state.selected = p;
    }

    onMounted(async () => getProducts());

    return {
      ...toRefs(state),
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
