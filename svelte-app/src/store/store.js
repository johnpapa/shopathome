import { writable } from 'svelte/store';

const state = {
  products: writable([]),
};

const getProducts = (products) => {
  state.products.update((old) => products);
};

const addProduct = (product) => {
  state.products.update((old) => {
    old.unshift(product);
    return old;
  });
};

const deleteProduct = (product) => {
  state.products.update((old) => [...old.filter((v) => v.id !== product.id)]);
};

const updateProduct = (product) => {
  state.products.update((old) => {
    const index = old.findIndex((v) => v.id === product.id);
    old.splice(index, 1, product);
    return [...old];
  });
};

export { state, addProduct, getProducts, updateProduct, deleteProduct };
