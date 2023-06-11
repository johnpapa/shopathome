import { Component, OnInit } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Product } from '../core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  template: `
    <div class="content-container">
      <app-list-header
        title="My List"
        (add)="enableAddMode()"
        (refresh)="getProducts()"
      ></app-list-header>
      <div *ngIf="errorMessage">
        {{ errorMessage }}
      </div>
      <div *ngIf="products$ | async as products">
        <div *ngIf="!products?.length && !errorMessage">Loading data ...</div>

        <div class="columns is-multiline is-variable">
          <div class="column is-8" *ngIf="products$ | async as products">
            <app-product-list
              *ngIf="!selected"
              [products]="products"
              (selected)="select($event)"
              (deleted)="askToDelete($event)"
            ></app-product-list>
            <app-product-detail
              *ngIf="selected"
              [product]="selected"
              (unselect)="clear()"
              (save)="save($event)"
            ></app-product-detail>
          </div>
        </div>

        <app-modal
          class="modal-product"
          [message]="message"
          [isOpen]="showModal"
          (handleNo)="closeModal()"
          (handleYes)="deleteProduct()"
        ></app-modal>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  errorMessage: string;
  selected: Product;
  products$: Observable<Product[]>;
  message = '?';
  productToDelete: Product;
  showModal = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  add(product: Product) {
    this.productService.addProduct(product).subscribe(() => {
      this.clear();
      this.getProducts();
    });
  }

  askToDelete(product: Product) {
    this.productToDelete = product;
    this.showModal = true;
    if (this.productToDelete.name) {
      this.message = `Would you like to delete ${this.productToDelete.name}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteProduct() {
    this.closeModal();
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete).subscribe(() => {
        this.productToDelete = null;
        this.clear();
        this.getProducts();
      });
    }
  }
  enableAddMode() {
    this.selected = <any>{};
  }

  getProducts() {
    this.errorMessage = undefined;
    this.products$ = this.productService.getProducts().pipe(
      map((p) => this.sortProducts(p)),
      catchError((error: any) => {
        this.errorMessage = 'Unauthorized';
        return [];
      }),
    );
  }

  save(product: Product) {
    if (this.selected && this.selected.name) {
      this.update(product);
    } else {
      this.add(product);
    }
  }

  select(product: Product) {
    this.selected = product;
  }

  sortProducts(products: Product[]) {
    return products.sort((a: Product, b: Product) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  update(product: Product) {
    this.productService.updateProduct(product).subscribe(() => {
      this.clear();
      this.getProducts();
    });
  }
}
