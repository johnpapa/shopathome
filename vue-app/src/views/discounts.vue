<script>
import { computed, onMounted, ref } from 'vue';
import ListHeader from '@/components/list-header.vue';
import store from '../store';

export default {
  name: 'Discounts',
  components: { ListHeader },
  setup(/* props, context */) {
    const errorMessage = ref('');
    const discounts = computed(() => store.getters['discounts/discounts']);
    const getDiscounts = async () => {
      errorMessage.value = undefined;
      try {
        store.dispatch('discounts/getDiscountsAction');
      } catch (error) {
        console.error(error);
        errorMessage.value = 'Unauthorized';
      }
    };

    onMounted(getDiscounts);

    return {
      discounts,
      errorMessage,
      getDiscounts,
    };
  },
};
</script>

<template>
  <div class="container columns">
    <div v-if="discounts" class="column is-8">
      <ListHeader
        title="My Discounts"
        @refresh="getDiscounts"
        :showAdd="false"
      ></ListHeader>
      <div v-if="errorMessage">{{ errorMessage }}</div>
      <div v-if="!discounts.length && !errorMessage">Loading data ...</div>
      <ul class="list">
        <li
          role="presentation"
          v-for="discount in discounts"
          :key="discount.id"
        >
          <div class="card">
            <div class="card-content">
              <div class="content discount-grid">
                <label>Store:</label><span>{{ discount.store }}</span>
                <label>Discount:</label><span>{{ discount.percentage }}%</span>
                <label>Code:</label><span>{{ discount.code }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
