<script>
export default {
  name: 'AuthLogin',
  props: {
    provider: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    goAuth() {
      let host = window.location.host;
      let pathname = window.location.pathname;
      let redirect = `post_login_redirect_uri=${host}${pathname}`;
      let url = `/.auth/login/${provider}?${redirect}`;
      window.location.href = url;
    },
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">{{ provider }}</div>
</template>
