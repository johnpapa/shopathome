import { Component } from '@angular/core';
import { Discount } from './core';
import { Observable, catchError } from 'rxjs';
import { DiscountService } from './discount.service';

@Component({
  selector: 'app-discount',
  template: `
    <div class="container columns">
      <div class="column is-8">
        <app-list-header
          title="My Discounts"
          (refresh)="getDiscounts()"
          [showAdd]="showAdd"
        ></app-list-header>
        <div *ngIf="errorMessage">{{ errorMessage }}</div>
        <div *ngIf="discounts$ | async as discounts">
          <div *ngIf="!discounts?.length && !errorMessage">
            Loading data ...
          </div>
          <ul class="list">
            <li
              role="presentation"
              *ngFor="
                let discount of discounts;
                trackBy: trackByDiscount;
                let i = index
              "
            >
              <div class="card">
                <div class="card-content">
                  <div class="content discount-grid">
                    <label>Store:</label><span>{{ discount.store }}</span>
                    <label>Discount:</label
                    ><span>{{ discount.percentage }}%</span> <label>Code:</label
                    ><span>{{ discount.code }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
})
export class DiscountComponent {
  errorMessage: string;
  showAdd = false;
  discounts$: Observable<Discount[]>;

  constructor(private discountService: DiscountService) {}

  ngOnInit() {
    this.getDiscounts();
  }

  getDiscounts() {
    this.errorMessage = undefined;
    this.discounts$ = this.discountService.getDiscounts().pipe(
      catchError((error: any) => {
        this.errorMessage = 'Unauthorized';
        return [];
      }),
    );
  }

  trackByDiscount(index: number, discount: Discount): number {
    return discount.id;
  }
}
