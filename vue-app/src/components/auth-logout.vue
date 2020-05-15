<script>
export default {
  name: 'AuthLogout',
  methods: {
    goAuth() {
      const { pathname } = window.location;
      const redirect = `post_logout_redirect_uri=${pathname}`;
      const url = `/.auth/logout?${redirect}`;
      window.location.href = url;
    },
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">Logout</div>
</template>
