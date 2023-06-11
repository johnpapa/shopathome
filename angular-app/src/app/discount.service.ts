import { Injectable } from '@angular/core';
import { API, Discount } from './core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DiscountService {
  private readonly apiUrl = `${API}/discounts`;

  constructor(private http: HttpClient) {}

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(this.apiUrl);
  }
}
