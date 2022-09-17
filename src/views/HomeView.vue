<template>
  <div class="home">
    <Login title="Log in"/>
    <icon icon="lock" />

  </div>
</template>

<script>

import Login from "@/components/login/Login";
export default {
  name: 'HomeView',
  components: {
    Login
      }
}
</script>
