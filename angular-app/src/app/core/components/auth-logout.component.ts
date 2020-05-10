import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-logout',
  template: ` <div class="auth-link" (click)="goAuth()">Logout</div> `,
})
export class AuthLogoutComponent {
  goAuth() {
    const { host, pathname } = window.location;
    const redirect = `post_logout_redirect_uri=${host}${pathname}`;
    const url = `/.auth/logout?${redirect}`;
    window.location.href = url;
  }
}
