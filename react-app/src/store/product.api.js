import axios from 'axios';
import { parseItem, parseList } from './action-utils';
import API from './config';

const captains = console;

export const deleteProductApi = async (product) => {
  const response = await axios.delete(`${API}/products/${product.id}`);
  return parseItem(response, 200);
};

export const updateProductApi = async (product) => {
  captains.log(product.id);
  const response = await axios.put(`${API}/products/${product.id}`, product);
  return parseItem(response, 200);
};

export const addProductApi = async (product) => {
  const response = await axios.post(`${API}/products`, product);
  return parseItem(response, 201);
};

export const loadProductsApi = async () => {
  const response = await axios.get(`${API}/products`);
  return parseList(response, 200);
};
