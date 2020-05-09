import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
      <div class="columns is-multiline is-variable">
        <div class="column is-8" *ngIf="products$ | async as products">
          <app-product-list
            *ngIf="!selected"
            [products]="products"
            [errorMessage]="errorMessage"
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
  `,
})
export class ProductsComponent implements OnInit {
  errorMessage: string;
  selected: Product;
  products$: Observable<Product[]>;
  message = '?';
  productToDelete: Product;
  showModal = false;

  constructor(private productService: ProductService) {
    this.products$ = productService.entities$;
  }

  ngOnInit() {
    this.getProducts();
  }

  add(product: Product) {
    this.productService.add(product);
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
      this.productService
        .delete(this.productToDelete.id)
        .subscribe(() => (this.productToDelete = null));
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  async getProducts() {
    this.errorMessage = undefined;
    this.productService.getAll().subscribe(
      (_) => {
        /*.. do nothing for success.. */
      },
      (error: any) => (this.errorMessage = error.error.statusText),
    );
    this.clear();
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

  update(product: Product) {
    this.productService.update(product);
  }
}
