import { Component } from '@angular/core';
import { Discount, AuthService, UserInfo } from './core';
import { Observable } from 'rxjs';
import { DiscountService } from './discount.service';

@Component({
  selector: 'app-discount',
  template: `
    <div class="container columns">
      <div *ngIf="discounts$ | async as discounts" class="column is-8">
        <div class="content-title-group">
          <h2 class="title">Discounts</h2>
        </div>
        <div *ngIf="!isAuth">
          Not Authorized
        </div>
        <div *ngIf="!discounts?.length && isAuth">
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
  isAuth = false;
  userInfo: UserInfo;
  discounts$: Observable<Discount[]>;

  constructor(
    private discountService: DiscountService,
    private authService: AuthService,
  ) {
    this.discounts$ = discountService.entities$;
  }

  async ngOnInit() {
    this.userInfo = await this.authService.getUserInfo();
    this.isAuth = !!this.userInfo?.userDetails;
    this.discountService.getAll();
  }

  trackByDiscount(index: number, discount: Discount): number {
    return discount.id;
  }
}
