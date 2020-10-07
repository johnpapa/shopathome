<script lang="ts">
import HeaderBarBrand from '@/components/header-bar-brand.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderBar',
  components: { HeaderBarBrand },
});
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
