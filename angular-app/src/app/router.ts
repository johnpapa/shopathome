import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { DiscountComponent } from './discount.component';
import { NotFoundComponent } from './core';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  { path: 'discounts', component: DiscountComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent },
];
