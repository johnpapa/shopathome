import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-logout',
  template: ` <div class="auth-link" (click)="goAuth()">Logout</div> `,
})
export class AuthLogoutComponent {
  private host = window.location.host;

  goAuth() {
    const pathname = window.location.pathname;
    const redirect = `post_logout_redirect_uri=${this.host}${pathname}`;
    const url = `/.auth/logout?${redirect}`;
    window.location.href = url;
  }
}
