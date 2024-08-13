<script>
export default {
  name: 'HeaderBarBrand',
};
</script>

<template>
  <div class="navbar-brand">
    <a
      aria-label="Navbar to https://vuejs.org"
      class="navbar-item"
      href="https://vuejs.org/"
      target="_blank"
      rel="noopener noreferrer"
      title="Navbar to https://vuejs.org"
    >
      <i class="fab js-logo fa-vuejs fa-2x" aria-hidden="true" />
    </a>
    <router-link to="/" class="navbar-item nav-home">
      <span class="brand-first">SHOP</span>
      <span class="brand-second">AT</span>
      <span class="brand-third">HOME</span>
    </router-link>
  </div>
</template>
