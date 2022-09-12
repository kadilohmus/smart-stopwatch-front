<template>
  <div>
    <div>
      <br><h1>Menu</h1>
      <h5>Coach: {{userName}}</h5>
      <router-link to="/settings" style="margin: 25px; width: 300px; height: 150px" class="btn btn-dark btn-lg" tag="button">Create new event</router-link>
      <router-link to="/search" style="margin: 25px; width: 300px; height: 150px" class="btn btn-dark btn-lg" tag="button">Athlete statistics</router-link>


    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data: function () {
    return {
      userName: sessionStorage.getItem('userName')
    }
  }
}
</script>