import { defineStore } from 'pinia';
import axios from 'axios';
import API from './config';
import { parseItem, parseList } from './action-utils';

// eslint-disable-next-line import/prefer-default-export
export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
  }),
  actions: {
    async getProductsAction() {
      try {
        const response = await axios.get(`${API}/products`);
        this.products = parseList(response);
        return this.products;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
    async deleteProductAction(product) {
      try {
        const response = await axios.delete(`${API}/products/${product.id}`);
        parseItem(response, 200);
        this.products = this.products.filter((p) => p.id !== product.id);
        return null;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
    async updateProductAction(product) {
      try {
        const response = await axios.put(
          `${API}/products/${product.id}`,
          product,
        );
        const updatedProduct = parseItem(response, 200);
        const index = this.products.findIndex((v) => v.id === product.id);
        this.products.splice(index, 1, updatedProduct);
        this.products = [...this.products];
        return updatedProduct;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
    async addProductAction(product) {
      try {
        const response = await axios.post(`${API}/products`, product);
        const addedProduct = parseItem(response, 201);
        this.products.unshift(addedProduct);
        return addedProduct;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
    },
  },
});
