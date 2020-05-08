import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="content-container">
      <div class="content-title-group not-found">
        <h2 class="title">Product Wish List</h2>
        <p>
          This project was created to help represent a fundamental app written
          with Angular. The shopping theme is used throughout the app.
        </p>
        <br />
        <h2 class="title">Resources</h2>
        <ul>
          <li>
            <a href="https://github.com/johnpapa/b20">
              Code in GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class HomeComponent {}
