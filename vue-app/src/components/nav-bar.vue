<script>
export default {
  name: 'NavBar',
  data() {
    return {
      userInfo: {
        type: Object,
        default() {},
      },
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
        <a v-if="!userInfo" href="/login/tw">Twitter</a>
        <a v-if="!userInfo" href="/login/gh">GitHub</a>
        <a v-if="!userInfo" href="/.auth/login/facebook">FaceBook</a>
        <a v-if="userInfo" href="/logout">Logout</a>
        <div class="user" v-if="userInfo">
          <p>Welcome</p>
          <p>{{ userInfo.userDetails }}</p>
          <p>({{ userInfo.identityProvider }})</p>
        </div>
      </div>
    </nav>
  </div>
</template>
