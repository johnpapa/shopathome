<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import type { SetupContext } from 'vue';
import ButtonFooter from '@/components/button-footer.vue';
import { Product } from '../../store/modules/models';

interface Props {
  product: Product;
}

interface ComponentState {
  addMode: boolean;
  editingProduct: Product;
}

export default defineComponent({
  name: 'ProductDetail',
  props: {
    product: {
      type: Product,
      default() {
        return new Product(0);
      },
    },
  },
  components: { ButtonFooter },
  setup(props: Props, context: SetupContext) {
    const { product } = toRefs(props);
    const state: ComponentState = reactive({
      addMode: false,
      editingProduct: { ...product.value },
    });

    watch(product, (/* newValue, oldValue */) => {
      if (product.value && product.value.id) {
        state.editingProduct = { ...product.value };
        state.addMode = false;
      } else {
        state.editingProduct = {
          id: 0,
          name: '',
          description: '',
          quantity: 0,
        };
        state.addMode = true;
      }
    });

    function clear() {
      context.emit('unselect');
    }

    function saveProduct() {
      context.emit('save', state.editingProduct);
      clear();
    }

    return { ...toRefs(state), clear, saveProduct };
  },
});
</script>

<template>
  <div class="card edit-detail">
    <header class="card-header">
      <p class="card-header-title">{{ editingProduct.name }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field" v-if="editingProduct.id">
          <label class="label" for="id">id</label>
          <input
            class="input"
            name="id"
            placeholder="99999"
            readonly
            type="text"
            v-model="editingProduct.id"
          />
        </div>
        <div class="field">
          <label class="label" for="name">name</label>
          <input
            class="input"
            name="name"
            placeholder="Oranges"
            type="text"
            v-model="editingProduct.name"
          />
        </div>
        <div class="field">
          <label class="label" for="description">description</label>
          <input
            class="input"
            name="description"
            placeholder="box"
            type="text"
            v-model="editingProduct.description"
          />
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
            v-model="editingProduct.quantity"
          />
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <ButtonFooter
        class="card-footer-item"
        label="Cancel"
        :className="'cancel-button'"
        :iconClasses="'fas fa-undo'"
        :item="editingProduct"
        @clicked="clear"
      ></ButtonFooter>
      <ButtonFooter
        class="card-footer-item"
        :className="'save-button'"
        :iconClasses="'fas fa-save'"
        :item="editingProduct"
        label="Save"
        @clicked="saveProduct"
      ></ButtonFooter>
    </footer>
  </div>
</template>
