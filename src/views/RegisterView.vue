<template>
  <div class="border border; container" style="border-radius: 50px; width: 400px; height: 380px">
    <AlertError :errorMessage="alertError"/>
    <br><h1>Create an account</h1><br>
    <input type="text" style="margin: 5px; border-color: white; border-radius: 7px" placeholder="Username" v-model="userRequest.userName"><br>
    <input type="password" style="margin: 5px; border-color: white; border-radius: 7px" placeholder="Password" v-model="userRequest.password"><br>
    <input type="password" style="margin: 5px; border-color: white; border-radius: 7px" placeholder="Re-type password" v-model="userRequest.passwordRetype"><br><br>
    <button type="button" style="margin: 5px" class="btn btn-dark btn-lg" v-on:click="registerNewUser">Create</button><br><br>
    <router-link to="/" style="color: white">Already have an account? Log in!</router-link>
  </div>
</template>

<script>
import AlertError from "@/components/alerts/AlertError";

export default {
  name: 'RegisterView',
  components: {AlertError},
  data: function () {
    return {
      alertError: '',
      userRequest: {
        userName: '',
        password: '',
        passwordRetype: ''
      }
    }
  },
  methods: {
    registerNewUser: function () {
      this.alertError = ''
      if (this.userRequest.password === this.userRequest.passwordRetype) {
        this.$http.post("/register/user", this.userRequest
        ).then(response => {
          sessionStorage.setItem('userName', this.userRequest.userName)
          this.$router.push({name: 'menuRoute'})
        }).catch(error => {
          this.alertError = error.response.data.detail
        });
      } else {
        this.alertError = 'Passwords do not match. Please try again!'
        // todo: kas saab ära kustutada mõlemad passwordid, aga username alles jätta?
      }

    },

  }
}
</script>
