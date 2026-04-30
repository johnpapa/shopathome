import { defineStore } from 'pinia';
import axios from 'axios';
import API from './config';
import { parseList } from './action-utils';

// eslint-disable-next-line import/prefer-default-export
export const useDiscountsStore = defineStore('discounts', {
  state: () => ({
    discounts: [],
  }),
  actions: {
    async getDiscountsAction() {
      try {
        const response = await axios.get(`${API}/discounts`);
        this.discounts = parseList(response);
        return this.discounts;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
  },
});
