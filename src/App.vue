<template>
  <div>
    <div id="app" class="header">
      <div class="header-left">
        <router-link to="/">Home</router-link>
<!--        <router-link to="/menu">Menu</router-link>-->
        <router-link to="/global-settings">Create event</router-link>
        <router-link to="/search">Search</router-link>
      </div>
    </div>
    <div id="app">
       <router-view/>
     </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #ffffff;
}
body {
  background: url("/src/assets/taust3.jpg");
  background-attachment: fixed;
  background-size: cover;
}

</style>
<script>export default {
  components: {}
}
</script>