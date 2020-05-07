import axios from 'axios';
import API from '../config';
import { parseItem, parseList } from './action-utils';
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from './mutation-types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    [ADD_PRODUCT](state, product) {
      state.products.unshift(product);
    },
    [UPDATE_PRODUCT](state, product) {
      const index = state.products.findIndex((v) => v.id === product.id);
      state.products.splice(index, 1, product);
      state.products = [...state.products];
    },
    [GET_PRODUCTS](state, products) {
      state.products = products;
    },
    [DELETE_PRODUCT](state, product) {
      state.products = [...state.products.filter((p) => p.id !== product.id)];
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getProductsAction({ commit }) {
      try {
        const response = await axios.get(`${API}/products`);
        const products = parseList(response);
        commit(GET_PRODUCTS, products);
        return products;
      } catch (error) {
        captains.error(error);
      }
    },
    async deleteProductAction({ commit }, product) {
      try {
        const response = await axios.delete(`${API}/products/${product.id}`);
        parseItem(response, 200);
        commit(DELETE_PRODUCT, product);
        return null;
      } catch (error) {
        captains.error(error);
      }
    },
    async updateProductAction({ commit }, product) {
      try {
        const response = await axios.put(
          `${API}/products/${product.id}`,
          product
        );
        const updatedproduct = parseItem(response, 200);
        commit(UPDATE_PRODUCT, updatedproduct);
        return updatedproduct;
      } catch (error) {
        captains.error(error);
      }
    },
    async addProductAction({ commit }, product) {
      try {
        const response = await axios.post(`${API}/products`, product);
        const addedProduct = parseItem(response, 201);
        commit(ADD_PRODUCT, addedProduct);
        return addedProduct;
      } catch (error) {
        captains.error(error);
      }
    },
  },
  getters: {
    products: (state) => state.products,
  },
};
