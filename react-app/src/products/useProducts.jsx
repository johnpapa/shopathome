import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addProductAction,
  deleteProductAction,
  loadProductsAction,
  selectProductAction,
  updateProductAction,
} from '../store';

/** Custom hook for accessing Product state in redux store */
function useProducts() {
  const dispatch = useDispatch();

  return {
    // Selectors
    products: useSelector((state) => state.products.data),
    selectedProduct: useSelector((state) => state.selectedProduct),
    error: useSelector((state) => state.products.error),

    // Dispatchers
    // Wrap any dispatcher that could be called within a useEffect() in a useCallback()
    addProduct: (product) => dispatch(addProductAction(product)),
    deleteProduct: (product) => dispatch(deleteProductAction(product)),
    getProducts: useCallback(() => dispatch(loadProductsAction()), [dispatch]), // called within a useEffect()
    selectProduct: (product) => dispatch(selectProductAction(product)),
    updateProduct: (product) => dispatch(updateProductAction(product)),
  };
}

export default useProducts;
