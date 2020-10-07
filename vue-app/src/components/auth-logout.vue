<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AuthLogout',
  setup() {
    const goAuth = () => {
      const { pathname } = window.location;
      const redirect = `post_logout_redirect_uri=${pathname}`;
      const url = `/.auth/logout?${redirect}`;
      window.location.href = url;
    };
    return { goAuth };
  },
});
</script>

<template>
  <div class="auth-link" @click="goAuth">Logout</div>
</template>
