<script>
  import { getContext, onMount } from 'svelte';
  import { Router, Link, Route } from 'svelte-routing';
  import { ROUTER } from 'svelte-routing/src/contexts';
  import AuthLogin from './AuthLogin.svelte';
  import AuthLogout from './AuthLogout.svelte';

  const { activeRoute } = getContext(ROUTER);
  let userInfo = undefined;
  const providers = ['twitter', 'github', 'aad', 'google', 'facebook'];

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

<div class="column is-2">
  <nav class="menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <Link to="/home" {getProps}>Home</Link>
      <Link to="/products" {getProps}>My List</Link>
      <Link to="/discounts" {getProps}>My Discounts</Link>
    </ul>
  </nav>
  <nav class="menu auth">
    <p class="menu-label">Auth</p>
    <div class="menu-list auth">
      {#if !userInfo}
        {#each providers as provider (provider)}
          <AuthLogin {provider} />
        {/each}
      {/if}
      {#if userInfo}
        <AuthLogout />
      {/if}
    </div>
  </nav>
  {#if userInfo}
    <div class="user">
      <p>Welcome</p>
      <p>{userInfo && userInfo.userDetails}</p>
      <p>{userInfo && userInfo.identityProvider}</p>
    </div>
  {/if}
</div>
