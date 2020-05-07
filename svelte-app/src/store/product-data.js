import * as store from './store';
import { parseItem, parseList } from './http-utils';
import API from './config';

export async function getProductsAction() {
  try {
    const response = await fetch(`${API}/products`, {
      method: 'GET',
    });
    const products = await parseList(response);
    store.getProducts(products);
    return products;
  } catch (error) {
    return console.log(error);
  }
}

export async function deleteProductAction(product) {
  try {
    const response = await fetch(`${API}/products/${product.id}`, {
      method: 'DELETE',
    });
    await parseItem(response, 200);
    store.deleteProduct(product);
    return null;
  } catch (error) {
    console.error(error);
  }
}
export async function updateProductAction(product) {
  try {
    const response = await fetch(`${API}/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const updatedProduct = await parseItem(response, 200);
    store.updateProduct(updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
}
export async function addProductAction(product) {
  try {
    const response = await fetch(`${API}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const addedProduct = await parseItem(response, 201);
    store.addProduct(addedProduct);
    return addedProduct;
  } catch (error) {
    console.error(error);
  }
}
