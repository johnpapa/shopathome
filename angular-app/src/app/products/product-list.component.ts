import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../core';

@Component({
    selector: 'app-product-list',
    template: `
    <ul class="list">
      @for (product of products; track trackByProduct(i, product); let i = $index) {
        <li
          role="presentation"
          >
          <div class="card">
            <app-card-content
              [name]="product.name"
              [description]="product.description"
            ></app-card-content>
            <footer class="card-footer">
              <app-button-footer
                class="card-footer-item"
                [className]="'delete-item'"
                [iconClasses]="'fas fa-trash'"
                (clicked)="deleteProduct($event)"
                label="Delete"
                [item]="product"
              ></app-button-footer>
              <app-button-footer
                class="card-footer-item"
                [className]="'edit-item'"
                [iconClasses]="'fas fa-edit'"
                (clicked)="selectProduct($event)"
                label="Edit"
                [item]="product"
              ></app-button-footer>
            </footer>
          </div>
        </li>
      }
    </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProductListComponent {
  @Input() products: Product[];
  @Output() deleted = new EventEmitter<Product>();
  @Output() selected = new EventEmitter<Product>();

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }

  selectProduct(product: Product) {
    this.selected.emit(product);
  }

  deleteProduct(product: Product) {
    this.deleted.emit(product);
  }
}
