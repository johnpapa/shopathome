import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-login',
  template: ` <div class="auth-link" (click)="goAuth()">{{ provider }}</div> `,
})
export class AuthLoginComponent {
  @Input() provider = '';

  goAuth() {
    const { pathname } = window.location;
    const redirect = `post_login_redirect_uri=${pathname}`;
    const url = `/.auth/login/${this.provider}?${redirect}`;
    window.location.href = url;
  }
}
