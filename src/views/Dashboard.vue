<template>
  <div class="dashboard">
    <p>This is a user dashboard view. It pulls in information from Vuex and is locked
    to logged-in visitors only.</p>
    <p>Your Twitch user data was stored in Mongo as:
      <pre>{{user}}</pre>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss">
.dashboard {
  pre {
    text-align: left;
  }
}
</style>
