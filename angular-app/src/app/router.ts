import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DiscountComponent } from './discounts.component';
import { NotFoundComponent } from './core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((m) => m.ProductsComponent),
  },
  { path: 'discounts', component: DiscountComponent },
  { path: '**', component: NotFoundComponent },
];
