<template>
  <div class="border border; container" style="border-radius: 50px; width: 400px; height: 380px">
    <br>
    <h1>{{ title }}</h1><br>
    <AlertError :errorMessage="alertError"/>
    <input type="text" style="margin: 5px; border-color: white; border-radius: 7px" placeholder="Username" v-model="loginRequest.userName"><br>
    <input type="password" style="margin: 5px; border-color: white; border-radius: 7px" placeholder="Password" v-model="loginRequest.password"><br><br>
    <button type="button" style="margin: 5px" class="btn btn-dark btn-lg" v-on:click="logIn">Log in</button><br><br>
    <router-link to="/register" style="color: white">Don't have an account? Create new!</router-link>
    <br>
  </div>

</template>

<script>
import AlertError from "@/components/alerts/AlertError";

export default {
  name: "Login",
  components: {AlertError},
  props: {
    title: String
  },
  data: function () {
    return {
      alertError: '',
      loginRequest: {
        userName: '',
        password: ''
      },
      loginResponse: {
        userId: 0,
        roleId: 0
      }
    }
  },


  methods: {
    logIn: function () {
      this.alertError = ''
      this.$http.post("/login", this.loginRequest
      ).then(response => {
        this.loginResponse = response.data
        if (this.loginResponse.roleId == 1) {
          this.$router.push({name: 'adminRoute'});
        } else {
          sessionStorage.setItem('userName', this.loginRequest.userName)
          this.$router.push({name: 'menuRoute'})
        }
      }).catch(error => {
        this.alertError = error.response.data.detail
      })
    }
  }
}

</script>

<style scoped>

</style>