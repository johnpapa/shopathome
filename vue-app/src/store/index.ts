import { createStore } from 'vuex';
import discountsModule from './modules/discounts';
import productsModule from './modules/products';
import type { RootState } from './modules/types';

export * from './modules/types';

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    products: productsModule,
    discounts: discountsModule,
  },
  actions: {},
  mutations: {},
  state() {
    return {} as RootState;
  },
});

export default store;
