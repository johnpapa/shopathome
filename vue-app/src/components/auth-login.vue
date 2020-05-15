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
      const { pathname } = window.location;
      const redirect = `post_login_redirect_uri=${pathname}`;
      const url = `/.auth/login/${this.provider}?${redirect}`;
      window.location.href = url;
    },
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">{{ provider }}</div>
</template>
