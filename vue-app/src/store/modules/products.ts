import axios from 'axios';
import type { ActionContext } from 'vuex';
import API from '../config';
import { parseItem, parseList } from './action-utils';
import { Product } from './models';
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from './mutation-types';
import { ProductsState, RootState } from './types';

const captains = console;

export default {
  strict: process.env.NODE_ENV !== 'production',
  // namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    [ADD_PRODUCT](state: ProductsState, product: Product) {
      state.products.unshift(product);
    },
    [UPDATE_PRODUCT](state: ProductsState, product: Product) {
      const index = state.products.findIndex((v) => v.id === product.id);
      state.products.splice(index, 1, product);
      state.products = [...state.products];
    },
    [GET_PRODUCTS](state: ProductsState, products: Product[]) {
      state.products = products;
    },
    [DELETE_PRODUCT](state: ProductsState, product: Product) {
      state.products = [...state.products.filter((p) => p.id !== product.id)];
    },
  },
  actions: {
    // actions let us get to ({ state, getters, commit, dispatch }) {
    async getProductsAction({
      commit,
    }: ActionContext<ProductsState, RootState>) {
      try {
        const response = await axios.get(`${API}/products`);
        const products = parseList(response);
        commit(GET_PRODUCTS, products);
        return products;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
    async deleteProductAction(
      { commit }: ActionContext<ProductsState, RootState>,
      product: Product,
    ) {
      try {
        const response = await axios.delete(`${API}/x/products/${product.id}`);
        parseItem(response, 200);
        commit(DELETE_PRODUCT, product);
        return null;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
    async updateProductAction(
      { commit }: ActionContext<ProductsState, RootState>,
      product: Product,
    ) {
      try {
        const response = await axios.put(
          `${API}/x/products/${product.id}`,
          product,
        );
        const updatedproduct = parseItem(response, 200);
        commit(UPDATE_PRODUCT, updatedproduct);
        return updatedproduct;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
    async addProductAction(
      { commit }: ActionContext<ProductsState, RootState>,
      product: Product,
    ) {
      try {
        const response = await axios.post(`${API}/x/products`, product);
        const addedProduct = parseItem(response, 201);
        commit(ADD_PRODUCT, addedProduct);
        return addedProduct;
      } catch (error) {
        captains.error(error);
        throw new Error(error);
      }
    },
  },
  getters: {
    products: (state: ProductsState) => state.products,
  },
};
