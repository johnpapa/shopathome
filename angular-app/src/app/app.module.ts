import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { externalModules } from './build-specific';
import { declarations } from './core';
import { DiscountComponent } from './discounts.component';
import { SharedModule } from './shared/shared.module';

@NgModule({ declarations: [AppComponent, HomeComponent, DiscountComponent, declarations],
    bootstrap: [AppComponent], imports: [BrowserModule,
        RouterModule.forRoot(routes, {}),
        SharedModule,
        externalModules], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
