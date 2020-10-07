<script lang="ts">
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'AuthLogin',
  props: {
    provider: {
      type: String,
      default: () => '',
    },
  },
  setup(props) {
    const { provider } = toRefs(props);

    function goAuth() {
      const { pathname } = window.location;
      const redirect = `post_login_redirect_uri=${pathname}`;
      const url = `/.auth/login/${provider.value}?${redirect}`;
      window.location.href = url;
    }

    return { goAuth };
  },
});
</script>

<template>
  <div class="auth-link" @click="goAuth">{{ provider }}</div>
</template>
