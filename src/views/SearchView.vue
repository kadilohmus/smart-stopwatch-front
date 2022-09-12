<template>
  <div>
    <br><h1>Search athlete</h1><br>
    <input type="text" style="margin: 5px" placeholder="Name"><br><br>
    <router-link to="/menu" style="margin: 25px" class="btn btn-outline-light" tag="button">Back to Menu</router-link>
    <button type="button" style="margin: 5px" class="btn btn-dark">Search</button>

  </div>
</template>

<script>
export default {
  name: "SearchView"
}
</script>

<style scoped>

</style>