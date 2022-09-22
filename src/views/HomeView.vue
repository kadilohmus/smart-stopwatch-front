<template>
  <div class="home">
    <Login title="Log in"/>
    <div class="image-container">
      <div class="text">SmartStopWatch</div>
    </div>
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
