<script>
  import { getContext, onMount } from 'svelte';
  import { Router, Link, Route } from 'svelte-routing';
  import { ROUTER } from 'svelte-routing/src/contexts';

  const { activeRoute } = getContext(ROUTER);
  let userInfo = undefined;

  onMount(async () => (userInfo = await getUserInfo()));

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === '/' ? isCurrent : isPartiallyCurrent || isCurrent;

    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: 'router-link-active' };
    }
    return {};
  }
</script>

<div>
  <nav class="column is-2 menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <Link to="/home" {getProps}>Home</Link>
      <Link to="/products" {getProps}>Products</Link>
      <Link to="/discounts" {getProps}>Discounts</Link>
    </ul>
  </nav>
  <nav class="menu auth">
    <p class="menu-label">Auth</p>
    <ul class="menu-list">
      <div class="auth">
        {#if !userInfo}
          <a href="/login/tw">Twitter</a>
          <a href="/login/gh">GitHub</a>
          <a href="/.auth/login/facebook">FaceBook</a>
        {/if}
        {#if userInfo}
          <a href="/logout">Logout</a>
          <div class="user">
            <p>{userInfo && userInfo.userDetails}</p>
            <p>({userInfo && userInfo.identityProvider})</p>
          </div>
        {/if}
      </div>
    </ul>
  </nav>
</div>
