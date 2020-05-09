import { Component } from '@angular/core';
import { Discount } from './core';
import { Observable } from 'rxjs';
import { DiscountService } from './discount.service';

@Component({
  selector: 'app-discount',
  template: `
    <div class="container columns">
      <div *ngIf="discounts$ | async as discounts" class="column is-8">
        <div class="content-title-group">
          <h2 class="title">My Discounts</h2>
        </div>
        <div *ngIf="errorMessage">{{ errorMessage }}</div>
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
                  ><span>{{ discount.percentage }}</span> <label>Code:</label
                  ><span>{{ discount.code }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class DiscountComponent {
  errorMessage: string;
  discounts$: Observable<Discount[]>;

  constructor(private discountService: DiscountService) {
    this.discounts$ = discountService.entities$;
  }

  ngOnInit() {
    this.errorMessage = undefined;
    this.discountService.getAll().subscribe(
      (_) => {
        /*.. do nothing for success.. */
      },
      (error: any) => (this.errorMessage = error.error.statusText),
    );
  }

  trackByDiscount(index: number, discount: Discount): number {
    return discount.id;
  }
}
