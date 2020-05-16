<script>
import { mapActions, mapGetters } from 'vuex';
import ListHeader from '@/components/list-header.vue';

export default {
  name: 'Discounts',
  data() {
    return {
      errorMessage: '',
    };
  },
  components: {
    ListHeader,
  },
  async created() {
    await this.getDiscounts();
  },
  computed: {
    ...mapGetters('discounts', { discounts: 'discounts' }),
  },
  methods: {
    ...mapActions('discounts', ['getDiscountsAction']),
    async getDiscounts() {
      this.errorMessage = undefined;
      try {
        await this.getDiscountsAction();
      } catch (error) {
        this.errorMessage = 'Unauthorized';
      }
    },
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
      <div v-if="!discounts.length && !errorMessage">
        Loading data ...
      </div>
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
