import { combineReducers } from 'redux';
import { selectedProductReducer, productsReducer } from './product.reducer';

export * from './product.actions';
export * from './product.reducer';
export * from './product.saga';

const store = combineReducers({
  products: productsReducer,
  selectedProduct: selectedProductReducer,
});

export default store;
