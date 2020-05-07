import {
  SELECT_PRODUCT,
  LOAD_PRODUCT_SUCCESS,
  LOAD_PRODUCT,
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

let initState = {
  loading: false,
  data: [],
  error: void 0,
};

export const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT:
      return { ...state, loading: true, error: '' };
    case LOAD_PRODUCT_SUCCESS:
      return { ...state, loading: false, data: [...action.payload] };
    case LOAD_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PRODUCT:
      return {
        ...state,
        data: state.data.map((h) => {
          if (h.id === action.payload.id) {
            state.loading = true;
          }
          return h;
        }),
      };
    case UPDATE_PRODUCT_SUCCESS:
      return modifyProductState(state, action.payload);
    case UPDATE_PRODUCT_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DELETE_PRODUCT: {
      return {
        ...state,
        loading: true,
        data: state.data.filter((h) => h !== action.payload),
      };
    }

    case DELETE_PRODUCT_SUCCESS: {
      const result = { ...state, loading: false };
      return result;
    }

    case DELETE_PRODUCT_ERROR: {
      return {
        ...state,
        data: [...state.data, action.payload.requestData],
        loading: false,
      };
    }

    case ADD_PRODUCT: {
      return { ...state, loading: true };
    }

    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: [...state.data, { ...action.payload }],
      };
    }

    case ADD_PRODUCT_ERROR: {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
};

const modifyProductState = (productState, productChanges) => {
  return {
    ...productState,
    loading: false,
    data: productState.data.map((h) => {
      if (h.id === productChanges.id) {
        return { ...h, ...productChanges };
      } else {
        return h;
      }
    }),
  };
};

let initialSelectedProduct = null;

export const selectedProductReducer = (
  state = initialSelectedProduct,
  action
) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.payload ? { ...action.payload } : null;
    default:
      return state;
  }
};
