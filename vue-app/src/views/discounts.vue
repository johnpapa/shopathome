<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Discounts',
  data() {
    return {
      errorMessage: '',
    };
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
      <div class="content-title-group">
        <h2 class="title">Discounts</h2>
      </div>
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
                <label>Discount:</label><span>{{ discount.percentage }}</span>
                <label>Code:</label><span>{{ discount.code }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
