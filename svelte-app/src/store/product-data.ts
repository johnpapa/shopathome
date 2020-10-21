import * as store from './store';
import { parseItem, parseList } from './http-utils';
import { API } from '../config';
import { Product } from '../models';

export async function getProductsAction() {
  try {
    const response = await fetch(`${API}/products`, {
      method: 'GET',
    });
    const products: Product[] = await parseList<Product>(response);
    store.getProducts(products);
    return products;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export async function deleteProductAction(product: Product) {
  try {
    const response = await fetch(`${API}/x/products/${product.id}`, {
      method: 'DELETE',
    });
    await parseItem<Product>(response, 200);
    store.deleteProduct(product);
    return null;
  } catch (error) {
    console.error(error);
  }
}
export async function updateProductAction(product: Product) {
  try {
    const response = await fetch(`${API}/x/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const updatedProduct: Product = await parseItem<Product>(response, 200);
    store.updateProduct(updatedProduct);
    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
}
export async function addProductAction(product: Product) {
  try {
    const response = await fetch(`${API}/x/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const addedProduct: Product = await parseItem<Product>(response, 201);
    store.addProduct(addedProduct);
    return addedProduct;
  } catch (error) {
    console.error(error);
  }
}
