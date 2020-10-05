import axios from 'axios';
import type { ActionContext } from 'vuex';
import API from '../config';
import { parseList } from './action-utils';
import type { Discount } from './models';
import type { DiscountsState, RootState } from './types';
import { GET_DISCOUNTS } from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  // namespaced: true,
  state: {
    discounts: [],
  } as DiscountsState,
  mutations: {
    [GET_DISCOUNTS](state: DiscountsState, discounts: Discount[]) {
      state.discounts = discounts;
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getDiscountsAction({
      commit,
    }: ActionContext<DiscountsState, RootState>) {
      try {
        const response = await axios.get(`${API}/discounts`);
        const discounts = parseList(response);
        commit(GET_DISCOUNTS, discounts);
        return discounts;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    discounts: (state: DiscountsState) => state.discounts,
  },
};
