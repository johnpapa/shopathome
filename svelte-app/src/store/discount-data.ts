import * as store from './store';
import { parseList } from './http-utils';
import { API } from '../config';
import { Discount } from '../models';

export async function getDiscountsAction() {
  try {
    const response = await fetch(`${API}/discounts`, {
      method: 'GET',
    });
    const discounts: Discount[] = await parseList(response);
    store.getDiscounts(discounts);
    return discounts;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
