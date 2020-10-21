import { Writable, writable } from 'svelte/store';
import { Discount, Product } from '../models';

interface AppState {
  discounts: Writable<Discount[]>;
  products: Writable<Product[]>;
}
const state: AppState = {
  discounts: writable([]),
  products: writable([]),
};

const getDiscounts = (discounts: Discount[]) => {
  state.discounts.update((old: Discount[]) => discounts);
};
const getProducts = (products: Product[]) => {
  state.products.update((old: Product[]) => products);
};

const addProduct = (product: Product) => {
  state.products.update((old: Product[]) => {
    old.unshift(product);
    return old;
  });
};

const deleteProduct = (product: Product) => {
  state.products.update((old: Product[]) => [
    ...old.filter((p) => p.id !== product.id),
  ]);
};

const updateProduct = (product: Product) => {
  state.products.update((old: Product[]) => {
    const index = old.findIndex((p) => p.id === product.id);
    old.splice(index, 1, product);
    return [...old];
  });
};

export {
  state,
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getDiscounts,
};
