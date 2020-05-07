import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  template: `
    <div class="content-container">
      <div class="content-title-group">
        <h2 class="title">Sign In/Out</h2>
        <br />
        <p><a href="/login">Login</a> here</p>
        <br />
        <p><a href="/logout">Logout</a> here</p>
        <br />
      </div>
    </div>
  `,
})
export class SignInComponent {}
