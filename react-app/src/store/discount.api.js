import axios from 'axios';
import { parseList } from './action-utils';
import API from './config';

export const loadDiscountsApi = async () => {
  const response = await axios.get(`${API}/discounts`);
  return parseList(response, 200);
};
