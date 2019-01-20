<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Login</h1>
    <p v-if="!isLoggedIn">This is the login screen. The Dashboard page is locked to users only.
      You can test by trying to click into Dashboard. This is set up in the router.</p>
    <div v-if="loaded">
      <a v-if="!isLoggedIn" href="/auth/twitch">
        <button class="button">Login with Twitch</button>
      </a>
      <div v-else href="/dashboard">
        <p>Welcome back {{user.username}}! Want to go to your
        <router-link to="/dashboard">dashboard</router-link>?</p>
        <p>Or, you can <a href="/logout">logout</a>.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['user', 'isLoggedIn'])
  },
  beforeCreate() {
    this.$store.dispatch('getMe').then(() => {
      this.loaded = true;
    });
  }
}
</script>
