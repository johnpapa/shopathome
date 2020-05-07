import { put, takeEvery, call, all } from 'redux-saga/effects';
import {
  LOAD_PRODUCT,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT_ERROR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
} from './product.actions';
import {
  addProductApi,
  deleteProductApi,
  loadProductsApi,
  updateProductApi,
} from './product.api';

export function* loadingProductsAsync() {
  try {
    const data = yield call(loadProductsApi);
    const productes = [...data];

    yield put({ type: LOAD_PRODUCT_SUCCESS, payload: productes });
  } catch (err) {
    yield put({ type: LOAD_PRODUCT_ERROR, payload: err.message });
  }
}

export function* watchLoadingProductsAsync() {
  yield takeEvery(LOAD_PRODUCT, loadingProductsAsync);
}

export function* updatingProductAsync({ payload }) {
  try {
    const data = yield call(updateProductApi, payload);
    const updatedProduct = data;

    yield put({ type: UPDATE_PRODUCT_SUCCESS, payload: updatedProduct });
  } catch (err) {
    yield put({ type: UPDATE_PRODUCT_ERROR, payload: err.message });
  }
}

export function* watchUpdatingProductAsync() {
  yield takeEvery(UPDATE_PRODUCT, updatingProductAsync);
}

export function* deletingProductAsync({ payload }) {
  try {
    yield call(deleteProductApi, payload);

    yield put({ type: DELETE_PRODUCT_SUCCESS, payload: null });
  } catch (err) {
    yield put({ type: DELETE_PRODUCT_ERROR, payload: err.message });
  }
}

export function* watchDeletingProductAsync() {
  yield takeEvery(DELETE_PRODUCT, deletingProductAsync);
}

export function* addingProductAsync({ payload }) {
  try {
    const data = yield call(addProductApi, payload);
    const addedProduct = data;

    yield put({ type: ADD_PRODUCT_SUCCESS, payload: addedProduct });
  } catch (err) {
    yield put({ type: ADD_PRODUCT_ERROR, payload: err.message });
  }
}

export function* watchAddingProductAsync() {
  yield takeEvery(ADD_PRODUCT, addingProductAsync);
}

export function* productSaga() {
  yield all([
    watchLoadingProductsAsync(),
    watchUpdatingProductAsync(),
    watchDeletingProductAsync(),
    watchAddingProductAsync(),
  ]);
}
