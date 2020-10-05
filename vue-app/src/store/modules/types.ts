import type { Discount, Product } from './models';

export interface RootState {}
export interface DiscountsState {
  discounts: Discount[];
}

export interface ProductsState {
  products: Product[];
}
