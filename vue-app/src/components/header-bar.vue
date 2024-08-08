<script>
import HeaderBarBrand from './header-bar-brand.vue';

export default {
  name: 'HeaderBar',
  components: { HeaderBarBrand },
};
</script>

<template>
  <header>
    <nav
      class="navbar has-background-dark is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <HeaderBarBrand></HeaderBarBrand>
    </nav>
  </header>
</template>
