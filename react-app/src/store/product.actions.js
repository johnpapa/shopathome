export const LOAD_PRODUCT = '[Products] LOAD_PRODUCT';
export const LOAD_PRODUCT_SUCCESS = '[Products] LOAD_PRODUCT_SUCCESS';
export const LOAD_PRODUCT_ERROR = '[Products] LOAD_PRODUCT_ERROR';

export const UPDATE_PRODUCT = '[Products] UPDATE_PRODUCT';
export const UPDATE_PRODUCT_SUCCESS = '[Products] UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_ERROR = '[Products] UPDATE_PRODUCT_ERROR';

export const DELETE_PRODUCT = '[Products] DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = '[Products] DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = '[Products] DELETE_PRODUCT_ERROR';

export const ADD_PRODUCT = '[Products] ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = '[Products] ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = '[Products] ADD_PRODUCT_ERROR';

export const SELECT_PRODUCT = '[Product] SELECT_PRODUCT';

export const selectProductAction = (product) => ({
  type: SELECT_PRODUCT,
  payload: product,
});
export const loadProductsAction = () => ({ type: LOAD_PRODUCT });

export const updateProductAction = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});
export const deleteProductAction = (product) => ({
  type: DELETE_PRODUCT,
  payload: product,
});
export const addProductAction = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});
