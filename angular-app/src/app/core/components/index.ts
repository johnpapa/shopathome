export * from './header-bar.component';
export * from './header-bar-brand.component';
export * from './nav.component';
export * from './not-found.component';

import { HeaderBarBrandComponent } from './header-bar-brand.component';
import { HeaderBarComponent } from './header-bar.component';
import { NavComponent } from './nav.component';
import { NotFoundComponent } from './not-found.component';

export const declarations = [
  NavComponent,
  HeaderBarComponent,
  HeaderBarBrandComponent,
  NotFoundComponent,
];
