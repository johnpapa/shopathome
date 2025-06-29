import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { AppComponent } from './app/app.component';
import { routes } from './app/router';
import { externalModules } from './app/build-specific';
import { environment } from './environments/environment';

if (environment.production) {
  import('@angular/core').then(core => core.enableProdMode());
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(externalModules)
  ]
}).catch(err => console.error(err));
