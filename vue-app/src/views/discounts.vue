<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import ListHeader from '@/components/list-header.vue';
import store from '../store';
import type { Discount } from '../store/modules/models';

interface ComponentState {
  errorMessage: Ref<string>;
  discounts: Ref<Discount[]>;
}

export default defineComponent({
  name: 'Discounts',
  components: { ListHeader },
  setup() {
    const state: ComponentState = {
      errorMessage: ref(''),
      discounts: computed(() => store.getters.discounts),
    };

    async function getDiscounts() {
      state.errorMessage.value = '';
      try {
        await store.dispatch('getDiscountsAction');
      } catch (error) {
        console.error(error);
        state.errorMessage.value = 'Unauthorized';
      }
    }

    onMounted(getDiscounts);

    return {
      ...state,
      getDiscounts,
    };
  },
});
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
