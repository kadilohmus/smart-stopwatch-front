<template>
  <div>
    <div>
      <br><br><h2>{{title}}</h2><br><br>
      <input type="text" style="margin: 5px" placeholder="Username" v-model="loginRequest.username"><br>
      <input type="password" style="margin: 5px" placeholder="Password" v-model="loginRequest.password"><br><br>
      <button type="button" style="margin: 5px" class="btn btn-dark" v-on:click="logIn">Log in</button>
      <br><br>
      <router-link to="/register">Register new user</router-link>

    </div>
  </div>

</template>

<script>
export default {
  name: "Login",
  components: {},
  props: {
    title: String
  },
  data: function () {
    return {
      loginRequest: {
        username: '',
        password: ''
      }
    }
  }
  ,
  methods: {
    logIn: function () {

      this.$http.post("/login", this.loginRequest
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>