import axios from 'axios';
import API from '../config';
import { parseList } from './action-utils';
import { GET_DISCOUNTS } from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    discounts: [],
  },
  mutations: {
    [GET_DISCOUNTS](state, discounts) {
      state.discounts = discounts;
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getDiscountsAction({ commit }) {
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
    discounts: (state) => state.discounts,
  },
};
