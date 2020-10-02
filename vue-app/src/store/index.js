import { createStore } from 'vuex';
import discountsModule from './modules/discounts';
import productsModule from './modules/products';

export * from './modules/mutation-types';

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    products: productsModule,
    discounts: discountsModule,
  },
  actions: {},
  mutiations: {},
  state() {
    return {};
  },
});

export default store;
