import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadDiscountsAction } from './store';

/** Custom hook for accessing Discount state in redux store */
function useDiscounts() {
  const dispatch = useDispatch();

  return {
    // Selectors
    discounts: useSelector((state) => state.discounts.data),
    error: useSelector((state) => state.discounts.error),

    // Dispatchers
    // Wrap any dispatcher that could be called within a useEffect() in a useCallback()
    getDiscounts: useCallback((e) => dispatch(loadDiscountsAction()), [
      dispatch,
    ]), // called within a useEffect()
  };
}

export default useDiscounts;
