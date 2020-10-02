<script>
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import ListHeader from '@/components/list-header.vue';
import Modal from '@/components/modal.vue';
import ProductDetail from './product-detail.vue';
import ProductList from './product-list.vue';
import store from '../../store';

const captains = console;

export default {
  name: 'Products',
  components: {
    ListHeader,
    ProductList,
    ProductDetail,
    Modal,
  },

  setup() {
    const state = reactive({
      errorMessage: '',
      message: '',
      productToDelete: null,
      routePath: '/products',
      selected: null,
      showModal: false,
      title: 'My List',
      count: 0,
      products: computed(() => store.getters['products/products']),
    });

    const askToDelete = (product) => {
      state.productToDelete = product;
      state.showModal = true;
      if (state.productToDelete.name) {
        state.message = `Would you like to delete ${state.productToDelete.name}?`;
        captains.log(state.message);
      }
    };
    const clear = () => {
      state.selected = ref(null);
    };
    const closeModal = () => {
      state.showModal = false;
    };
    const deleteProduct = () => {
      closeModal();
      if (state.productToDelete) {
        captains.log(
          `You said you want to delete ${state.productToDelete.name}`,
        );
        store.dispatch('products/deleteProductAction', state.productToDelete);
      }
      clear();
    };
    const enableAddMode = () => {
      state.selected = ref({});
    };
    const getProducts = async () => {
      state.errorMessage = undefined;
      try {
        store.dispatch('products/getProductsAction');
      } catch (error) {
        state.errorMessage = 'Unauthorized';
      }
      clear();
    };
    const save = (product) => {
      captains.log('product changed', product);
      if (product.id) {
        store.dispatch('products/updateProductAction', product);
      } else {
        store.dispatch('products/addProductAction', product);
      }
    };
    const select = (p) => {
      state.selected = ref(p);
    };

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
};
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
