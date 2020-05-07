import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <div class="content-container">
      <div class="content-title-group">
        <h2 class="title">Admin</h2>
        <p>
          Only users with the admin role should be able to get to this page.
        </p>
        <br />
      </div>
    </div>
  `,
})
export class AdminComponent {}
