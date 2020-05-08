import * as store from './store';
import { parseList } from './http-utils';
import API from './config';

export async function getDiscountsAction() {
  try {
    const response = await fetch(`${API}/discounts`, {
      method: 'GET',
    });
    const discounts = await parseList(response);
    store.getDiscounts(discounts);
    return discounts;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
