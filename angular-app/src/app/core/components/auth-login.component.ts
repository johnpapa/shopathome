import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-login',
  template: ` <div class="auth-link" (click)="goAuth()">{{ provider }}</div> `,
})
export class AuthLoginComponent {
  @Input() provider = '';
  private host = window.location.host;

  goAuth() {
    const pathname = window.location.pathname;
    const redirect = `post_login_redirect_uri=${this.host}${pathname}`;
    const url = `/.auth/login/${this.provider}?${redirect}`;
    window.location.href = url;
  }
}
