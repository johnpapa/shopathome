import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DiscountComponent } from './discounts.component';
import { NotFoundComponent } from './core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  { path: 'discounts', component: DiscountComponent },
  { path: '**', component: NotFoundComponent },
];
