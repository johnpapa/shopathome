import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <a routerLink="/products" routerLinkActive="router-link-active">
          <span>Products</span>
        </a>
        <a routerLink="/admin" routerLinkActive="router-link-active">
          <span>Admin</span>
        </a>
        <a routerLink="/about" routerLinkActive="router-link-active">
          <span>About</span>
        </a>
        <a *ngIf="!userInfo" href="/login">Login</a>
        <a *ngIf="userInfo" href="/logout">Logout</a>
        <p *ngIf="userInfo">{{ userInfo?.userDetails }}</p>
      </ul>
    </nav>
  `,
})
export class NavComponent implements OnInit {
  userInfo: {
    identityProvider: string;
    userId: string;
    userDetails: string;
    userRoles: string[];
  } = null;

  async ngOnInit(): Promise<void> {
    this.userInfo = await this.getUserInfo();
  }

  async getUserInfo() {
    const response = await fetch('/.auth/me');
    const payload = await response.json();
    const { clientPrincipal } = payload;
    return clientPrincipal;
  }
}
