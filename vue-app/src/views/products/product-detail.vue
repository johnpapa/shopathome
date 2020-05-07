<script>
import ButtonFooter from '@/components/button-footer.vue';

export default {
  name: 'ProductDetail',
  props: {
    product: {
      type: Object,
      default() {},
    },
  },
  components: { ButtonFooter },
  data() {
    return {
      addMode: false,
      editingProduct: { ...this.product },
    };
  },
  watch: {
    product() {
      if (this.product && this.product.id) {
        this.editingProduct = { ...this.product };
        this.addMode = false;
      } else {
        this.editingProduct = { id: undefined, name: '', description: '' };
        this.addMode = true;
      }
    },
  },
  methods: {
    clear() {
      this.$emit('unselect');
    },
    saveProduct() {
      this.$emit('save', this.editingProduct);
      this.clear();
    },
  },
};
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
