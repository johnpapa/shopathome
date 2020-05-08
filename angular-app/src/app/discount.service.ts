import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Discount } from './core';

@Injectable({ providedIn: 'root' })
export class DiscountService extends EntityCollectionServiceBase<Discount> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Discount', serviceElementsFactory);
  }
}
