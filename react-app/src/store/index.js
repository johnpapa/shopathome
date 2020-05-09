import { combineReducers } from 'redux';
import { selectedProductReducer, productsReducer } from './product.reducer';
import { discountsReducer } from './discount.reducer';

export * from './product.actions';
export * from './product.reducer';
export * from './product.saga';
export * from './product.api';
export * from './discount.actions';
export * from './discount.reducer';
export * from './discount.saga';
export * from './discount.api';

const store = combineReducers({
  products: productsReducer,
  discounts: discountsReducer,
  selectedProduct: selectedProductReducer,
});

export default store;
