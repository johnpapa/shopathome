import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Product } from '../core';

@Component({
  selector: 'app-product-detail',
  template: `
    <div class="card edit-detail">
      <header class="card-header">
        <p class="card-header-title">
          {{ editingProduct.name }}
          &nbsp;
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field" *ngIf="editingProduct.id">
            <label class="label" for="id">
              id
            </label>
            <input
              name="id"
              class="input"
              type="text"
              [(ngModel)]="editingProduct.id"
              placeholder="e.g. ProductColleen"
              readOnly
            />
          </div>
          <div class="field">
            <label class="label" for="name">
              name
            </label>
            <input
              name="name"
              class="input"
              type="text"
              [(ngModel)]="editingProduct.name"
              placeholder="Oranges"
            />
          </div>
          <div class="field">
            <label class="label" for="description">
              description
            </label>
            <input
              name="description"
              class="input"
              type="text"
              [(ngModel)]="editingProduct.description"
              placeholder="box"
            />
          </div>
          <div class="field">
            <label class="label" for="quantity">
              quantity
            </label>
            <input
              name="quantity"
              class="input"
              type="number"
              min="1"
              max="100"
              [(ngModel)]="editingProduct.quantity"
              placeholder="1"
            />
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <app-button-footer
          class="card-footer-item"
          [className]="'cancel-button'"
          [iconClasses]="'fas fa-undo'"
          (clicked)="clear()"
          label="Cancel"
          [item]="editingProduct"
        ></app-button-footer>
        <app-button-footer
          class="card-footer-item"
          [className]="'save-button'"
          [iconClasses]="'fas fa-save'"
          (clicked)="saveProduct()"
          label="Save"
          [item]="editingProduct"
        ></app-button-footer>
      </footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnChanges {
  @Input() product: Product;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Product>();

  addMode = false;
  editingProduct: Product;

  ngOnChanges(changes: SimpleChanges) {
    if (this.product && this.product.id) {
      this.editingProduct = { ...this.product };
      this.addMode = false;
    } else {
      this.editingProduct = {
        id: undefined,
        name: '',
        description: '',
        quantity: 1,
      };
      this.addMode = true;
    }
  }

  clear() {
    this.unselect.emit();
  }

  saveProduct() {
    this.save.emit(this.editingProduct);
    this.clear();
  }
}
