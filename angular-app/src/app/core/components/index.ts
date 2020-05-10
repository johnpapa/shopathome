export * from './auth-login.component';
export * from './auth-logout.component';
export * from './header-bar.component';
export * from './header-bar-brand.component';
export * from './nav.component';
export * from './not-found.component';

import { AuthLoginComponent } from './auth-login.component';
import { AuthLogoutComponent } from './auth-logout.component';
import { HeaderBarBrandComponent } from './header-bar-brand.component';
import { HeaderBarComponent } from './header-bar.component';
import { NavComponent } from './nav.component';
import { NotFoundComponent } from './not-found.component';

export const declarations = [
  AuthLoginComponent,
  AuthLogoutComponent,
  NavComponent,
  HeaderBarComponent,
  HeaderBarBrandComponent,
  NotFoundComponent,
];
