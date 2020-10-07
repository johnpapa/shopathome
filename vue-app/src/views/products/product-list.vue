<script lang="ts">
import { defineComponent } from 'vue';
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';
import type { Product } from '../../store/modules/models';

const captains = console;

export default defineComponent({
  name: 'ProductList',
  props: {
    products: {
      type: Array as () => Array<Product>,
    },
    errorMessage: {
      type: String,
      default: () => '',
    },
  },
  components: {
    CardContent,
    ButtonFooter,
  },
  setup(props, context) {
    function deleteProduct(p: Product) {
      context.emit('deleted', p);
      captains.log(`You tried to delete ${p.name}`);
    }

    function selectProduct(p: Product) {
      captains.log(`You tried to select ${p.name}`);
      context.emit('selected', p);
    }

    return { deleteProduct, selectProduct };
  },
});
</script>

<template>
  <div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <div v-if="!products.length && !errorMessage">Loading data ...</div>
    <ul class="list">
      <li
        v-for="(product, index) in products"
        :key="product.id"
        role="presentation"
      >
        <div class="card">
          <CardContent
            :name="product.name"
            :description="product.description"
          />
          <footer class="card-footer">
            <ButtonFooter
              class="delete-item"
              iconClasses="fas fa-trash"
              @clicked="deleteProduct(product)"
              label="Delete"
              :dataIndex="index"
              :dataId="product.id"
              :item="product"
            />
            <ButtonFooter
              class="edit-item"
              iconClasses="fas fa-edit"
              @clicked="selectProduct(product)"
              label="Edit"
              :dataIndex="index"
              :dataId="product.id"
              :item="product"
            />
          </footer>
        </div>
      </li>
    </ul>
  </div>
</template>
