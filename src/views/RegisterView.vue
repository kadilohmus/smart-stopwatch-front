<template>
  <div>
    <AlertError :errorMessage="alertError"/>
    <div class="border border; container" style="border-radius: 50px; width: 400px; height: 380px">
      <br>
      <h1>Create an account</h1><br>
      <input type="text" class="rounded" style="margin: 5px; border-color: white" placeholder="Username"
             v-model="userRequest.userName"><br>
      <input type="password" class="rounded" style="margin: 5px; border-color: white" placeholder="Password"
             v-model="userRequest.password"><br>
      <input type="password" class="rounded" style="margin: 5px; border-color: white" placeholder="Re-type password"
             v-model="userRequest.passwordRetype"><br><br>
      <button type="button" style="margin: 5px" class="btn btn-dark btn-lg" v-on:click="registerNewUser">Create</button>
      <br><br>
      <router-link to="/" style="color: white">Already have an account? Log in!</router-link>
    </div>
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
      },
      userResponse: {
        userId: 0,
        roleId: 0
      }
    }
  },
  methods: {
    registerNewUser: function () {
      this.alertError = ''
      if (this.userRequest.password === this.userRequest.passwordRetype) {
        this.$http.post("/register/user", this.userRequest
        ).then(response => {
          this.userResponse = response.data
          sessionStorage.setItem('userName', this.userRequest.userName)
          sessionStorage.setItem('userId', this.userResponse.userId)
          this.$router.push({name: 'menuRoute'})
        }).catch(error => {
          this.alertError = error.response.data.detail
        });
      } else {
        this.alertError = 'Passwords do not match. Please try again!'
        // kas saab ära kustutada mõlemad passwordid, aga username alles jätta?
        // siit on veel puudu alert --> [Kasutajanimi peab olema vahemikus 3-20 tähemärki, Parool peab olema vahemikus 3-255 tähemärki]
      }

    },

  }
}
</script>
