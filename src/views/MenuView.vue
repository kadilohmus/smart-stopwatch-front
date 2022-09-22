<template>
  <div>
    <div>
      <br><br><h1>Hi, {{userName}}!</h1><br><br>
      <router-link to="/global-settings" style="margin: 25px; width: 300px; height: 150px" class="btn btn-outline-light btn-lg" tag="button">Create new event</router-link>
      <router-link to="/search" style="margin: 25px; width: 300px; height: 150px" class="btn btn-outline-light btn-lg" tag="button">Athlete statistics</router-link>


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