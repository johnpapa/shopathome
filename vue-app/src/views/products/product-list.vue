<script>
import ButtonFooter from '@/components/button-footer.vue';
import CardContent from '@/components/card-content.vue';

const captains = console;

export default {
  name: 'ProductList',
  props: {
    products: {
      type: Array,
      default: () => [],
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
    const deleteProduct = (product) => {
      context.emit('deleted', product);
      captains.log(`You tried to delete ${product.name}`);
    };
    const selectProduct = (product) => {
      captains.log(`You tried to select ${product.name}`);
      context.emit('selected', product);
    };

    return { deleteProduct, selectProduct };
  },
};
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
