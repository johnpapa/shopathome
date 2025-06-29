import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderBarComponent } from './core/components/header-bar.component';
import { NavComponent } from './core/components/nav.component';

@Component({
    selector: 'app-root',
    template: `
    <div>
      <app-header-bar></app-header-bar>
      <div class="section columns">
        <app-nav class="column is-2"></app-nav>
        <main class="column">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
    standalone: true,
    imports: [RouterOutlet, HeaderBarComponent, NavComponent]
})
export class AppComponent {}
