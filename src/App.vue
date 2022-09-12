<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/admin">Admin</router-link> |
      <router-link to="/menu">Menu</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/search">Search</router-link>
    </nav>
    <router-view/>
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
  background: url("/src/assets/background.png");
  background-attachment: fixed;
  background-size: cover;
}

</style>
