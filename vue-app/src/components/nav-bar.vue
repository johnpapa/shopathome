<script>
import AuthLogin from './auth-login.vue';
import AuthLogout from './auth-logout.vue';

export default {
  name: 'NavBar',
  components: {
    AuthLogin,
    AuthLogout,
  },
  data() {
    return {
      userInfo: {
        type: Object,
        default() {},
      },
      providers: ['github', 'Microsoft Entra ID'],
    };
  },
  async created() {
    this.userInfo = await this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      try {
        const response = await fetch('/.auth/me');
        const payload = await response.json();
        const { clientPrincipal } = payload;
        return clientPrincipal;
      } catch (error) {
        console.error('No profile could be found');
        return undefined;
      }
    },
  },
};
</script>
<template>
  <div class="column is-2">
    <nav class="menu">
      <p class="menu-label">Menu</p>
      <ul class="menu-list">
        <router-link to="/home">Home</router-link>
        <router-link to="/products">My List</router-link>
        <router-link to="/discounts">My Discounts</router-link>
      </ul>
    </nav>
    <nav class="menu auth">
      <p class="menu-label">Auth</p>
      <div class="menu-list auth">
        <template v-if="!userInfo">
          <AuthLogin
            :provider="provider"
            v-for="provider in providers"
            :key="provider"
          />
        </template>
        <AuthLogout v-if="userInfo" />
      </div>
    </nav>
    <div class="user" v-if="userInfo">
      <p>Welcome</p>
      <p>{{ userInfo.userDetails }}</p>
      <p>{{ userInfo.identityProvider }}</p>
    </div>
  </div>
</template>
