<script>
export default {
  name: 'AuthLogout',
  methods: {
    goAuth() {
      let host = window.location.host;
      let pathname = window.location.pathname;
      let redirect = `post_logout_redirect_uri=${host}${pathname}`;
      let url = `/.auth/logout?${redirect}`;
      window.location.href = url;
    },
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">Logout</div>
</template>
