import {
  LOAD_DISCOUNT_SUCCESS,
  LOAD_DISCOUNT,
  LOAD_DISCOUNT_ERROR,
} from './discount.actions';

let initState = {
  loading: false,
  data: [],
  error: void 0,
};

export const discountsReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_DISCOUNT:
      return { ...state, loading: true, error: '' };
    case LOAD_DISCOUNT_SUCCESS:
      return { ...state, loading: false, data: [...action.payload] };
    case LOAD_DISCOUNT_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
