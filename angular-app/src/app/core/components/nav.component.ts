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
      </ul>
    </nav>
    <nav class="menu auth">
      <p class="menu-label">Auth</p>
      <ul class="menu-list">
        <div class="auth">
          <a *ngIf="!userInfo" href="/login/t">Twitter</a>
          <a *ngIf="!userInfo" href="/login/g">GitHub</a>
          <a *ngIf="!userInfo" href="/login/f">FaceBook</a>
          <a *ngIf="userInfo" href="/logout">Logout</a>
          <div class="user" *ngIf="userInfo">
            <p>{{ userInfo?.userDetails }}</p>
            <p>({{ userInfo?.identityProvider }})</p>
          </div>
        </div>
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
