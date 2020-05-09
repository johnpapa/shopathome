import { put, takeEvery, call, all } from 'redux-saga/effects';
import {
  LOAD_DISCOUNT,
  LOAD_DISCOUNT_SUCCESS,
  LOAD_DISCOUNT_ERROR,
} from './discount.actions';
import { loadDiscountsApi } from './discount.api';

export function* loadingDiscountsAsync() {
  try {
    const data = yield call(loadDiscountsApi);
    const discounts = [...data];

    yield put({ type: LOAD_DISCOUNT_SUCCESS, payload: discounts });
  } catch (err) {
    yield put({ type: LOAD_DISCOUNT_ERROR, payload: err.message });
  }
}

export function* watchLoadingDiscountsAsync() {
  yield takeEvery(LOAD_DISCOUNT, loadingDiscountsAsync);
}

export function* discountSaga() {
  yield all([watchLoadingDiscountsAsync()]);
}
