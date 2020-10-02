<script>
import { toRefs } from 'vue';

export default {
  name: 'AuthLogin',
  props: {
    provider: {
      type: String,
      default: () => '',
    },
  },
  setup(props) {
    const { provider } = toRefs(props);

    const goAuth = () => {
      const { pathname } = window.location;
      const redirect = `post_login_redirect_uri=${pathname}`;
      const url = `/.auth/login/${provider.value}?${redirect}`;
      window.location.href = url;
    };

    return {
      goAuth,
    };
  },
};
</script>

<template>
  <div class="auth-link" @click="goAuth">{{ provider }}</div>
</template>
